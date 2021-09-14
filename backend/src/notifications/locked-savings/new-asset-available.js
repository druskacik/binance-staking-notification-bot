const User = require('../../models/User');
const sendTelegramMessage = require('../../services/telegram-bot');

const sendNewLockedSavingsAssetAvailableNotifications = async (asset) => {
    try {
        let users = await User.forge()
            .where({
                subscribe_locked_savings: 1,
                active: 1,
                is_pro: 1,
            })
            .fetchAll();
        users = users.toJSON();

        await Promise.all(users.map(async (user) => {
            if (user.telegram_chat_id) {
                await sendTelegramMessage('new-locked-savings-asset-available', user.telegram_chat_id, {
                    asset,
                });
            }
        }));
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendNewLockedSavingsAssetAvailableNotifications;
