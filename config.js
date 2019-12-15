module.exports = {
    // aws user
    ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY,
    SECRET_KEY: process.env.AWS_SECRET_KEY,
    REGION: 'eu-west-2',

    // queue
    SQS_URL: process.env.SQS_URL,

    // sms
    SMS_PORTAL_API_KEY: process.env.SMS_PORTAL_API_KEY,
    SMS_PORTAL_USERNAME: process.env.SMS_PORTAL_USERNAME,
    SMS_PORTAL_URL: process.env.SMS_PORTAL_URL,

    // email
    MJ_PUBLIC: process.env.MJ_PUBLIC,
    MJ_PRIVATE: process.env.MJ_PRIVATE,
    MJ_ERROR_MAIL: process.env.MJ_ERROR_MAIL
};
