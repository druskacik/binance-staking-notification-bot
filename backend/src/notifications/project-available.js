const Asset = require('../models/Asset');
const sendTelegramMessage = require('../services/telegram-bot');

const sendStakingProjectAvailableNotification = async (projects, assetID, extraAsset) => {
    try {

        let asset = await Asset.forge()
            .where({
                id: assetID,
            })
            .fetch({
                withRelated: [{
                    users (query) {
                        query.where({
                            is_pro: 1,
                        }).select();
                    },
                }],
            });
        asset = asset.toJSON();

        await Promise.all(asset.users.map(async (user) => {
            if (user.telegram_chat_id) {
                await sendTelegramMessage('staking-project-available', user.telegram_chat_id, {
                    assetName: asset.asset_name,
                    extraAsset,
                    projects,
                });
            }
        }));
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendStakingProjectAvailableNotification;
