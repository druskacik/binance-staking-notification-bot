const sendStakingProjectAvailableEmail = require('../services/mailer/emails/staking-project-available');
const Asset = require('../models/Asset');
const sendTelegramMessage = require('../services/telegram-bot');

const sendStakingProjectAvailableNotification = async (projects, assetID) => {
    try {

        let asset = await Asset.forge()
            .where({
                id: assetID,
            })
            .fetch({
                withRelated: [{
                    users: function (query) {
                        query.where({
                            active: 1,
                            is_pro: 1,
                        }).select();
                    },
                }],
            })
        asset = asset.toJSON();

        await Promise.all(asset.users.map(async (user) => {
            if (user.address) {
                await sendStakingProjectAvailableEmail(user, projects);
            } else {
                await sendTelegramMessage('staking-project-available', user.telegram_chat_id, {
                    projects,
                })
            }
        }));

    } catch (err) {
        console.log(err);
    }
}

module.exports = sendStakingProjectAvailableNotification;