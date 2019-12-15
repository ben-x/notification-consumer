const axios = require('axios');
const Config = require('./config');

const smsSenderName = 'Znap';

const smsHandler = async (msg) => {
    if (msg.senderName) {
        msg.senderName = msg.senderName.substr(0, 11); // sender for sms cannot be more than 11 character.
    }

    return  await axios.get(Config.SMS_PORTAL_URL, {
        params: {
            username: Config.SMS_PORTAL_USERNAME,
            apikey: Config.SMS_PORTAL_API_KEY,
            sender: msg.senderName || smsSenderName,
            messagetext: msg.message,
            flash: '0',
            recipients: msg.recipients
        }
    })
};

module.exports = smsHandler;
