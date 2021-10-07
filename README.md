This project is task for showing my skills

Unfortunately I am not able to conitue it due to the death of my close relative

=================================================================================

First , this project is made up of a front end and a backend.
The front end is consisted of ReactJs with AWS Amplify Auth Module.
For AWS Amplify I am using the built in auth system " withAuthenticator(App) " and   "@aws-amplify/ui-react". Why ? Since why shall someone rewrite a code that is already written ? 

Second , the back end consists of Serverless framework with serverless stack , bth written in type script.
I usually write the back end before start connecting the front end with the api.

The profile api ( Lambda ) renders the user's data to be shown in the front end
The showPosts-public renders the user's public posts
The showPosts-private renders the user's private posts
The delete comment and post will be done shortly.

The front end should be able to do the above functionalities alone , where the delete comment and post are triggered from the front end,
and captured in the backend , or can be done in the front end directly , using AWS SDK and amplify

For the database, there are two tables , the user data one which shall take the data from the front end using cognito and localstorage ,
and the second table is the posts table that contains the title , body , and type.

Those are the main functionalities.
Will document the functions as much as possible.
Will push to github my previous projects and microservices using the same stack.

To start the app please run : npx sst deploy --stage dev 
