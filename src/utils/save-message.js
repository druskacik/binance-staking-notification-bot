const knex = require('../../connection');

const saveTelegramMessage = async (chatID, message) => {
    try {

        await knex('message').insert({
            chat_id: chatID,
            message,
        })
        
    } catch (err) {
        console.log(err);
    }
}

module.exports = saveTelegramMessage;