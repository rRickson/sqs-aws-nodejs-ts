import * as express from "express";
import { SQSSender } from "./sqsSender";
import { SqsReciver } from "./sqsReciver";

var app = express()

app.get('/', function (req, res) {
    res.send('Hello World!')
})

app.listen(808, function () {
    SQSSender.sendMessage();
    console.log('app listening on port 8083!')
});

var sqsReciver = new SqsReciver();