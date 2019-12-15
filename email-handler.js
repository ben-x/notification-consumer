const Config = require('./config');
const MJFluentUtil = require('mailjet-fluent-util').connect(Config.MJ_PUBLIC, Config.MJ_PRIVATE);

const senderName = 'Znap';
const senderEmail = 'no-reply@justznap.com';

const emailHandler = async (msg) => {
    const recipients = msg.recipients.map((i) => {
        return {
            Email: i.email,
            Name: i.name,
            Vars: i.vars
        };
    });

    const mailOption = new MJFluentUtil.OptionsBuilder()
        .setSubject(msg.subject)
        .setSenderEmail(msg.senderEmail || senderEmail)
        .setSenderName(msg.senderName || senderName)
        .setHTMLContent(msg.htmlContent || '')
        .setTextContent(msg.textContent || '')
        .isUsingMailJetTemplate(true)
        .setErrorReportingMail(Config.MJ_ERROR_MAIL)
        .setRecipients(recipients)
        .build();

    const errors = MJFluentUtil.isMailOptionSendable(mailOption);

    if (errors.length > 0) {
        throw new Error(errors);
    }

    let result;

    try {
        result = await MJFluentUtil.sendMail(mailOption);
    } catch (e) {
        throw e
    } finally {
        MJFluentUtil.disconnect();
    }

    return result;
};

module.exports = emailHandler;
