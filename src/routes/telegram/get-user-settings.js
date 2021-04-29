const knex = require('../../../connection');
const User = require('../../models/User');

const getUserSettings = async (chatID) => {
    try {

        let user = await User.forge().where({
            telegram_chat_id: chatID,
        }).fetch({
            withRelated: ['assetsLocked', 'assetsDefi'],
        });
        user = user.toJSON();

        return user;

    } catch (err) {
        throw err;
    }
}

module.exports = getUserSettings;