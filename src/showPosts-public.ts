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
        let userId = '';
        if (event.body) {
            const body = JSON.parse(event.body)
            if (body.userId)
                userId = body.userId;
        }

        console.log("here1")
        const result = await postTypeRendering(userId)
        console.log(result)
        if (result.postType === "public") {
            return {
                statusCode: 200,
                headers: { "Content-Type": "text/plain" },
                body: result + "",
            };
        } else {
            return {
                statusCode: 200,
                headers: { "Content-Type": "text/plain" },
                body: "There are no public posts",
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
