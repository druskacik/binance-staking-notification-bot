const axios = require('axios');
const Mustache = require('mustache');

const knex = require('../../../connection');
const readFileAsync = require('../../utils/read-file-async');

const sendBulkMessageAboutPremium = async () => {
    try {
        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

        const currentTimestamp = Date.now();
        const numDays = 7;
        const lastTimestampToFetch = currentTimestamp - (24 * 60 * 60 * 1000 * numDays);
        const lastDatetimeToFetch = new Date(lastTimestampToFetch);

        const telegramUsers = await knex('user')
            .where({
                is_pro: 0, // email users have is_pro = 1, so this selects only Telegram users
            })
            .orWhere('created_at', '>', lastDatetimeToFetch)
            .select();

        const templateText = await readFileAsync(__dirname + '/message.mustache');
        const text = Mustache.render(templateText);

        const messageParams = {
            parse_mode: 'HTML',
            text,
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
        }));
    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
};

sendBulkMessageAboutPremium();
