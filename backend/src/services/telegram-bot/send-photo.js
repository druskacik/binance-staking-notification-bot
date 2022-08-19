const axios = require('axios');
const FormData = require('form-data');
const Mustache = require('mustache');

const readFileAsync = require('../../utils/read-file-async');

const sendTelegramPhoto = async (chatID, item, photo) => {
    try {

        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendPhoto`;

        templateText = await readFileAsync(__dirname + '/messages/new-launchpad-project.mustache');
        text = Mustache.render(templateText, {
            ...item,
            hasEndTime: Boolean(item.endTime),
        });

        const formData = new FormData();
        formData.append('chat_id', chatID);
        formData.append('photo', photo, 'logo.png');
        formData.append('caption', text);
        formData.append('parse_mode', 'HTML');

        const response = await axios.post(url, formData, {
            headers: formData.getHeaders(),
        });

        return response;
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendTelegramPhoto;
