const axios = require('axios');
const Mustache = require('mustache');

const readFileAsync = require('../../utils/read-file-async');

const editTelegramMessage = async (messageType, chatID, messageID) => {
    try {
        let text;
        let templateText;
        const parseMode = 'HTML';

        switch (messageType) {
            case 'crypto-invoice-expired':
                templateText = await readFileAsync(__dirname + '/messages/crypto-invoice-expired.mustache');
                text = Mustache.render(templateText);
                break;
            default:
                templateText = await readFileAsync(__dirname + '/messages/crypto-invoice-expired.mustache');
                text = Mustache.render(templateText);
                break;
            }

        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/editMessageText`;

        const response = await axios.get(url, {
            params: {
                chat_id: chatID,
                message_id: messageID,
                parse_mode: parseMode,
                text,
                disable_web_page_preview: 1,
            },
        });

        return response;
    } catch (err) {
        console.log(err);
    }
};

module.exports = editTelegramMessage;
