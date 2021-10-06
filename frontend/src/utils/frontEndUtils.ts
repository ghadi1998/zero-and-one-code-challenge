import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB({ apiVersion: "2012-08-10" });
const marshaller = DynamoDB.Converter.unmarshall;




export const getUserDataFromDynamoDB = async (email: string) => {
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
