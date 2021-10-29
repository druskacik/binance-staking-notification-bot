const axios = require('axios');
const Mustache = require('mustache');

const readFileAsync = require('../utils/read-file-async');

const sendAdminNotification = async (messageType, data) => {
    try {
        let text;
        let templateText;

        const adminChatID = process.env.ADMIN_TELEGRAM_CHAT_ID;

        switch (messageType) {
            case 'crypto-payment-settled':
                templateText = await readFileAsync(__dirname + '/messages/crypto-payment-settled.mustache');
                text = Mustache.render(templateText, {
                    ...data,
                });
                break;
            
            default:
                templateText = await readFileAsync(__dirname + '/messages/crypto-payment-settled.mustache');
                text = Mustache.render(templateText, {
                    ...data,
                });
        }

        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

        const response = await axios.get(url, {
            params: {
                chat_id: adminChatID,
                parse_mode: 'HTML',
                text,
            },
        });

        return response;
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendAdminNotification;
