import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";

export const handler: APIGatewayProxyHandlerV2 = async (
    event: APIGatewayProxyEventV2
) => {

    try {

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