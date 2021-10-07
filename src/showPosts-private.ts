import { APIGatewayProxyEventV2, APIGatewayProxyHandlerV2 } from "aws-lambda";
import { postTypeRendering } from "./utils/index";

export const handler: APIGatewayProxyHandlerV2 = async (
    event: APIGatewayProxyEventV2
) => {
    const headers = {
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,POST",
    };
    try {
        let email = '';
        if (event.body) {
            const body = JSON.parse(event.body)
            if (body.email)
                email = body.email;
        }

        console.log("here1")
        const result = await postTypeRendering(email)
        console.log("result")
        if (result.postType === "private")
            return result

        else {
            return {
                statusCode: 200,
                headers: { "Content-Type": "text/plain" },
                body: "There are no private posts",
            };
        }
    } catch (e: any) {
        console.error("An exception was thrown!");
        console.error(e.message);
        console.error(e);

        return {
            statusCode: e.statusCode,
            body: JSON.stringify(e.message),
            headers,
        }
    }
}
