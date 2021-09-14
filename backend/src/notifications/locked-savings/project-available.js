const AssetLockedSavings = require('../../models/AssetLockedSavings');
const sendTelegramMessage = require('../../services/telegram-bot');

const sendLockedSavingsProjectAvailableNotification = async (projects, assetID) => {
    try {
        let asset = await AssetLockedSavings
            .where({
                id: assetID,
            })
            .fetch({
                withRelated: [{
                    users (query) {
                        query.where({
                            active: 1,
                            is_pro: 1,
                        }).select();
                    },
                }],
            });
        asset = asset.toJSON();

        await Promise.all(asset.users.map(async (user) => {
            if (user.telegram_chat_id) {
                await sendTelegramMessage('locked-savings-project-available', user.telegram_chat_id, {
                    projects,
                });
            }
        }));
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendLockedSavingsProjectAvailableNotification;
