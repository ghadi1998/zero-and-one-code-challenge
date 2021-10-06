import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import * as AWS from "aws-sdk"


import { getPayload, getUserDataFromDynamoDB } from "./utils/index";

export const handler: APIGatewayProxyHandlerV2 = async (
    event: APIGatewayProxyEventV2
) => {
    try {
        let email = '';
        if (event.body) {
            const body = JSON.parse(event.body)
            if (body.email)
                email = body.email;
        }

        const result = await getUserDataFromDynamoDB(email)
        const user = result.username


        if (result) {
            return {
                statusCode: 200,
                headers: { "Content-Type": "text/plain" },
                body: user + "",
            };
        }

        return {
            statusCode: 200,
            headers: { "Content-Type": "text/plain" },
            body: event.body,
        };
    } catch (error) {
        return {
            statusCode: 200,
            headers: { "Content-Type": "text/plain" },
            body: JSON.stringify(error),
        };
    }
};
