const axios = require('axios');
const Mustache = require('mustache');

const knex = require('../../../connection');
const readFileAsync = require('../../utils/read-file-async');

const sendBulkMessageAboutPremium = async () => {
    try {

        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

        const telegramUsers = await knex('user')
            .whereNotNull('telegram_chat_id')
            .select();

        const templateText = await readFileAsync(__dirname + '/message.mustache');
        const text = Mustache.render(templateText);

        const messageParams = {
            parse_mode: 'HTML',
            text: text,
            disable_web_page_preview: 1,
        };

        await Promise.all(telegramUsers.map(async (user) => {
            try {
                await axios.get(url, {
                    params: {
                        chat_id: user.telegram_chat_id,
                        ...messageParams,
                    },
                });
            } catch (err) {
                console.log('ERROR, BOT WAS BLOCKED BY THE USER');
            }
        }))

    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
}

sendBulkMessageAboutPremium();