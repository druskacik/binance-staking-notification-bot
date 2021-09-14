const knex = require('../../connection');

const saveTelegramMessage = async (chatID, message) => {
    try {
        await knex('message').insert({
            chat_id: chatID,
            message,
        });
    } catch (err) {
        console.log(err);
    }
};

const saveTelegramButtonClick = async (chatID, data) => {
    try {
        await knex('payment_button_click').insert({
            chat_id: chatID,
            data,
        });
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    saveTelegramMessage,
    saveTelegramButtonClick,
};
