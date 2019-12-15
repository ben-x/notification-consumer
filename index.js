const AWS = require('aws-sdk');
const smsHandler = require('./sms-handler');
const emailHandler = require('./email-handler');
const Config = require('./config');

const sqs = new AWS.SQS({
    apiVersion: '2012-11-05',
    region: Config.REGION
});

const deleteMessageFromQueue = async (msgHandle) => {
    return sqs.deleteMessage({
        QueueUrl: Config.SQS_URL,
        ReceiptHandle: msgHandle
    });
};

exports.handler = async (evt, ctx) => {
    const record = evt.Records[0];
    const msgAttr = record.messageAttributes;

    let result;

    if (msgAttr.messageType.stringValue === 'sms') {
        try {
            result = await smsHandler(JSON.parse(record.body));
        } catch (e) {
            return console.error('Unable to send SMS', e);
        }

        await deleteMessageFromQueue(record.receiptHandle);
    } else if (msgAttr.messageType.stringValue === 'email') {
        try {
            result = await emailHandler(JSON.parse(record.body));
        } catch (e) {
            return console.error('Unable to send Email', e);
        }

        await deleteMessageFromQueue(record.receiptHandle);
    } else {
        throw new Error('Unsupported message type')
    }

    return true;
};
