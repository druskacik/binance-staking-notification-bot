const knex = require('../../../../connection');
const User = require('../../../models/User');

const unsubscribeAssets = async (chatID, assets) => {
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
                    subscribe_new_assets: 0,
                });
        }

        const dbAssets = await knex('asset')
            .whereIn('asset_name', assets)
            .select();

        if (dbAssets.length > 0) {
            const dbAssetsIDs = dbAssets.map(asset => asset.id);

            await knex('user_asset_notification')
                .where({
                    user_id: user.id,
                })
                .whereIn('asset_id', dbAssetsIDs)
                .del();
        }

        return dbAssets.map(asset => asset.asset_name);
    } catch (err) {
        throw err;
    }
};

module.exports = unsubscribeAssets;
