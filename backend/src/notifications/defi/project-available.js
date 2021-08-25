const sendDefiProjectAvailableEmail = require('../../services/mailer/emails/defi-project-available');
const AssetDefi = require('../../models/AssetDefi');
const sendTelegramMessage = require('../../services/telegram-bot');

const sendDefiStakingProjectAvailableNotification = async (projects, assetID) => {
    try {

        let asset = await AssetDefi.forge()
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
                await sendDefiProjectAvailableEmail(user, projects);
            } else {
                await sendTelegramMessage('defi-project-available', user.telegram_chat_id, {
                    projects,
                })
            }
        }));

    } catch (err) {
        console.log(err);
    }
}

module.exports = sendDefiStakingProjectAvailableNotification;