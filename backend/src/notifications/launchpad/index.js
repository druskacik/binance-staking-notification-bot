const User = require('../../models/User');

const sendTelegramMessage = require('../../services/telegram-bot');
const sendTelegramPhoto = require('../../services/telegram-bot/send-photo');

const sendNewLaunchpadProjectNotifications = async (item, photo) => {
    try {
        let users = await User
            .where({
                subscribe_launchpad: 1,
                active: 1,
                // TODO: set it up only for subbed users
                // is_pro: 1,
            })
            .fetchAll();
        users = users.toJSON();

        await Promise.all(users.map(async (user) => {
            if (user.address) {
                // TODO: send email !
                // await ...(user, item);
            } else {
                if (photo) {
                    await sendTelegramPhoto(user.telegram_chat_id, item, photo);
                } else {
                    await sendTelegramMessage('new-launchpad-project', user.telegram_chat_id, {
                        item,
                    });
                }
            }
        }));
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendNewLaunchpadProjectNotifications;
