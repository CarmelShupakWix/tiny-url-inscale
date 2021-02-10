import  * as AWS  from "aws-sdk"

AWS.config.update({region: 'eu-centeral-1'})
var sqs = new AWS.SQS({ apiVersion: '2012-11-05'})



export const sendEmailWithShortUrl = async function(email: string, shortUrl: string, longUrl: string){
    console.log("User-Service, send the Email to SQS");
    const params = {
        // MessageAttributes: {
        //     "Short": {
        //         DataType: "String",
        //         StringValue: shortUrl
        //     },
        //     "Long": {
        //         DataType: "String",
        //         StringValue: longUrl
        //     }
        // },
        MessageBody: String(email + " " + shortUrl + " " + longUrl),
        QueueUrl: 'https://sqs.eu-central-1.amazonaws.com/204375983547/Short-and-Long-Url'
    }
    await sqs.sendMessage(params, function(err: Error, data:any){
        if(err){
            console.log("Error", err);
        } else {
            console.log("Success", data.MessageId);
        }
    })
}

