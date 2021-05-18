const User = require('../../models/User');

const sendTelegramMessage = require('../../services/telegram-bot');
const sendNewActivityAvailableEmail = require('../../services/mailer/emails/new-activity');

const sendNewActivityAvailableNotifications = async (item) => {
    try {

        let users = await User.forge()
            .where({
                subscribe_activities: 1,
                active: 1,
            })
            .fetchAll();
        users = users.toJSON();

        await Promise.all(users.map(async (user) => {
            if (user.address) {
                await sendNewActivityAvailableEmail(user, item);
            } else {
                await sendTelegramMessage('new-activity-available', user.telegram_chat_id, {
                    item,
                })
            }
        }));

    } catch (err) {
        console.log(err);
    }
}

module.exports = sendNewActivityAvailableNotifications;