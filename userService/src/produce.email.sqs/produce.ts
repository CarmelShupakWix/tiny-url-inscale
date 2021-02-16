import  * as AWS  from "aws-sdk"

AWS.config.update({region: 'eu-centeral-1'})
var sqs = new AWS.SQS({ apiVersion: '2012-11-05'})

export const sendUserEmail = async function (userEmail: string) {
    console.log("User-Service-Produce, send the Email to SQS");
    const params = {
        MessageBody: userEmail,
        QueueUrl: process.env.AWS_SQS_URL
    }
    try{
        await sqs.sendMessage(params, function(err: Error, data){
            if(err){
                console.log("Error", err);
            } else {
                console.log("Success", data.MessageId);
            }
        })
    } catch (ex) {
        console.log(`User-Service-Produce: Error: ${ex}`);
    }
}