import * as sst from "@serverless-stack/resources";


export default class MyStack extends sst.Stack {
  constructor(scope: sst.App, id: string, props?: sst.StackProps) {
    super(scope, id, props);

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      routes: {
        "GET /": "src/lambda.handler",
      },
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
      Domain: mySite.distributionDomain,
      "ApiEndpoint": api.url,
    });
  }
}
