import * as sst from "@serverless-stack/resources";


export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      routes: {
        "GET /": {
          function: {
            srcPath: ".",
            handler: "src/lambda.handler",
          },

        }

        ,
        "POST /profile": {

          function: {
            srcPath: ".",
            handler: "src/profile.handler",

          },
        }
        ,
        "POST /showPrivatePosts": {
          function: {
            srcPath: ".",
            handler: "src/showPosts-private.handler",
            permissions: ["dynamodb:GetItem",],
          }
        },
        "POST /showPublicPosts": {
          function: {
            srcPath: ".",
            handler: "src/showPosts-public.handler",
            permissions: ["dynamodb:GetItem",],
          }
        }

      },
    });


    const userDataTable = new sst.Table(this, "userDataTable", {
      fields: {
        userId: sst.TableFieldType.STRING,
        email: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "userId" },
    });

    const userPostTable = new sst.Table(this, "userPostTable", {
      fields: {
        userId: sst.TableFieldType.STRING,
        postId: sst.TableFieldType.STRING,
        postTitle: sst.TableFieldType.STRING,
        postBody: sst.TableFieldType.STRING,
      },
      primaryIndex: { partitionKey: "userId", sortKey: "postId" },
    });


    const mySite = new sst.ReactStaticSite(this, "ReactSite", {
      path: "frontend",
      buildOutput: "build",
      buildCommand: "npm run build",
      errorPage: sst.StaticSiteErrorOptions.REDIRECT_TO_INDEX_PAGE,
      environment: {
        // Pass in the API endpoint to our app
        REACT_APP_API_URL: api.url,
      },
    });




    // Show the endpoint in the output
    this.addOutputs({
      userDataTable: userDataTable.tableArn,
      userPostTable: userPostTable.tableArn,
      Domain: mySite.distributionDomain,
      ApiEndpoint: api.url,
    });
  }
}
