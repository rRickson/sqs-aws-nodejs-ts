import * as AWS from "aws-sdk";

AWS.config.update({ region: 'us-east-1' });

const conf = require('../config.json');

const sqs = new AWS.SQS({
    accessKeyId: conf.aws.accessKeyId,
    secretAccessKey: conf.aws.secretAccessKey,
});

const queueUrl = `https://sqs.us-east-1.amazonaws.com/` + conf.aws.account_id + `/` + conf.aws.filq_sqs;

const params = {
    QueueUrl: queueUrl,
    MaxNumberOfMessages: 1,
    VisibilityTimeout: 0,
};

export class SqsReciver {
    constructor() {
        this.reciver();
    }
    private reciver(): void {
        sqs.receiveMessage(params, (err, data) => {
            if (err) {
                console.log(err, err.stack);
            } else {
                if (!data.Messages) {
                    console.log('Nada para processar');
                    this.reciver();
                }
                const orderData = JSON.parse(data.Messages[0].Body);
                console.log('Mensagem recebida', orderData);
                const deleteParams = {
                    QueueUrl: queueUrl,
                    ReceiptHandle: data.Messages[0].ReceiptHandle
                };
                sqs.deleteMessage(deleteParams, (err, data) => {
                    if (err) {
                        console.log(err, err.stack);
                    } else {
                        console.log('Mensagem Deletada da Queue');
                        this.reciver();
                    }
                });
            }
        });
    }
}