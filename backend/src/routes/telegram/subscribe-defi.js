const knex = require('../../../connection');
const User = require('../../models/User');

const subscribeDefiAssets = async (chatID, assets) => {
    try {

        let user = await User.forge().where({
            telegram_chat_id: chatID,
        }).fetch();
        user = user.toJSON();

        const dbAssets = await knex('asset_defi')
            .whereIn('asset_name', assets)
            .select();

        if (assets.includes('NEW')) {
            await knex('user')
				.where({
					id: user.id,
				})
				.update({
					subscribe_defi: 1,
				})
        }

        // delete if exist and then create again
        // not very clever, but fast
        // TODO: make this better

        if (dbAssets.length > 0) {

            const dbAssetsIDs = dbAssets.map(asset => asset.id);

            const subscribedAssets = dbAssetsIDs.map((assetID) => ({
                user_id: user.id,
                asset_defi_id: assetID,
            }));

            await knex('user_defi_notification')
                .where({
                    user_id: user.id,
                })
                .whereIn('asset_defi_id', dbAssetsIDs)
                .del();
    
            await knex('user_defi_notification').insert(subscribedAssets);

        }

        
        return dbAssets.map(asset => asset.asset_name);

    } catch (err) {
        throw err;
    }
}

module.exports = subscribeDefiAssets;