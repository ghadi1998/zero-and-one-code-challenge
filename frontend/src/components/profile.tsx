import * as React from "react";
import { Auth } from 'aws-amplify';
import { getUserDataFromDynamoDB } from "../utils/frontEndUtils"

class Profile extends React.Component {
    getUser = async () => {
        const email = Auth.currentAuthenticatedUser()
        return email
    }
    fetchData = async () => {
        const email = await this.getUser()
        const userData = await getUserDataFromDynamoDB(email)
        return userData
    }
    render() {
        return <>
            <button onClick={() => this.fetchData()}> Fetch </button>
        </>
    }
}



export default Profile