import * as AWS from "aws-sdk"
const dynamoDb = new AWS.DynamoDB()
import { jsonContentType } from "./schemas";
import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";


export const getContentType = (event: APIGatewayProxyEventV2) => {
    console.log("Headers are");
    console.log(event.headers);
    return event.headers["Content-Type"] || event.headers["content-type"];
};

export const getPayload = async (event: APIGatewayProxyEventV2) => {
    await jsonContentType.validate(getContentType(event));
    console.log("body is");
    console.log(event.body);
    return event.body;
};

