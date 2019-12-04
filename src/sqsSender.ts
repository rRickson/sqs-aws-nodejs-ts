import * as AWS from "aws-sdk";

AWS.config.update({ region: 'us-east-1' });

const conf = require('../config.json');

const sqs = new AWS.SQS({
    accessKeyId: conf.aws.accessKeyId,
    secretAccessKey: conf.aws.secretAccessKey,
});

const params = {
    MessageBody: JSON.stringify({
        order_id: 1234,
        date: (new Date()).toISOString()
    }),
    QueueUrl: `https://sqs.us-east-1.amazonaws.com/` + conf.aws.account_id + `/` + conf.aws.filq_sqs
};

export class SQSSender {
    public static sendMessage() {
        sqs.sendMessage(params, (err, data) => {
            if (err) {
                console.log("Error", err);
            } else {
                console.log("Successfully added message", data.MessageId);
            }
        });

    }
}