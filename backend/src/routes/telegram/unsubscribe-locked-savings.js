const knex = require('../../../connection');
const User = require('../../models/User');

const unsubscribeLockedSavingsAssets = async (chatID, assets) => {
    try {
        let user = await User.forge().where({
            telegram_chat_id: chatID,
        }).fetch();
        user = user.toJSON();

        if (assets.includes('NEW')) {
            await knex('user')
                .where({
                    id: user.id,
                })
                .update({
                    subscribe_locked_savings: 0,
                });
        }

        const dbAssets = await knex('asset_locked_savings')
            .whereIn('asset_name', assets)
            .select();

        if (dbAssets.length > 0) {
            const dbAssetsIDs = dbAssets.map(asset => asset.id);

            await knex('user_locked_savings_notification')
                .where({
                    user_id: user.id,
                })
                .whereIn('asset_locked_saving_id', dbAssetsIDs)
                .del();
        }

        return dbAssets.map(asset => asset.asset_name);
    } catch (err) {
        throw err;
    }
};

module.exports = unsubscribeLockedSavingsAssets;
