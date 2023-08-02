const axios = require('axios');
const Mustache = require('mustache');

const knex = require('../../../connection');
const readFileAsync = require('../../utils/read-file-async');

const wait = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const sendAdminMessage = async () => {
    try {
        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

        const telegramUsers = await knex('user')
            .whereNotNull('telegram_chat_id')
            .select();

        const templateText = await readFileAsync(__dirname + '/message.mustache');
        const text = Mustache.render(templateText);

        const messageParams = {
            parse_mode: 'HTML',
            text,
            disable_web_page_preview: 1,
        };

        await Promise.all(telegramUsers.map(async (user, index) => {
            try {
                const chatID = user.telegram_chat_id;
                console.log(`Sending message to chat ID ${chatID} ...`);
                await wait(index * 50);
                await axios.get(url, {
                    params: {
                        chat_id: chatID,
                        ...messageParams,
                    },
                });
            } catch (err) {
                console.log(err.message || err);
            }
        }));
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
};

sendAdminMessage();
