import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB({ apiVersion: "2012-08-10" });
const marshaller = DynamoDB.Converter.unmarshall;
import { jsonContentType } from "./schemas";
import { APIGatewayProxyEventV2 } from "aws-lambda";


export const getContentType = (event: APIGatewayProxyEventV2): string | undefined => {
    console.log("Headers are");
    console.log(event.headers);
    return event.headers["Content-Type"] || event.headers["content-type"];
};

export const getPayload = async (event: APIGatewayProxyEventV2): Promise<string | undefined> => {
    await jsonContentType.validate(getContentType(event));
    console.log("body is");
    console.log(event.body);
    return event.body;
};


export const getUserDataFromDynamoDB = async (email: string): Promise<DynamoDB.AttributeMap> => {
    const params = {
        TableName: "userDataTable",
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: {
            ":email": {
                S: email,
            },
        },
    };
    const user = await dynamoDb.query(params).promise();
    user.Items = user.Items!.map((item) => {
        return marshaller(item);
    });
    return user.Items[0];
};

export const addUserPostData = async (postBody: string, postTitle: string, userId: string, postType: string): Promise<void> => {
    const timeStamp = Date.now() / 1000;
    const params = {
        Item: {
            userId: {
                S: userId,
            },
            postTitle: {
                S: postTitle,
            },
            postBody: {
                S: postBody,
            },
            postType: {
                S: postType,
            },
            postTimeStamp: {
                N: JSON.stringify(Date.now),
            },
        },
        TableName: "userPostData",
    };

    console.log(params);
    await dynamoDb.putItem(params).promise();
};



export const postTypeRendering = async (userId: string): Promise<DynamoDB.AttributeMap> => {
    const params = {
        TableName: "prod-zero-and-one-userPostTable",
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: {
            ":userId": {
                S: userId,
            },
        },
    };
    const user = await dynamoDb.query(params).promise();
    user.Items = user.Items!.map((item) => {
        return marshaller(item);
    });
    return user.Items[0];
};



