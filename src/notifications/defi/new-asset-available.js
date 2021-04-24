const sendNewDefiAssetAvailableEmail = require('../../mailer/emails/new-defi-asset');
const User = require('../../models/User');
const sendTelegramMessage = require('../../services/telegram-bot');

const sendNewDefiAssetAvailableNotifications = async (asset) => {
    try {

        let users = await User.forge()
            .where({
                subscribe_defi: 1,
                active: 1,
            })
            .fetchAll();
        users = users.toJSON();

        await Promise.all(users.map(async (user) => {
            if (user.address) {
                await sendNewDefiAssetAvailableEmail(user, asset);
            } else {
                await sendTelegramMessage('new-defi-asset-available', user.telegram_chat_id, {
                    asset,
                })
            }
        }));

    } catch (err) {
        console.log(err);
    }
}

module.exports = sendNewDefiAssetAvailableNotifications;