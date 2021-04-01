const sendStakingProjectAvailableEmail = require('../mailer/emails/staking-project-available');
const Asset = require('../models/Asset');

const sendStakingProjectAvailableNotification = async (project, assetID) => {
    try {

        let asset = await Asset.forge()
            .where({
                id: assetID,
            })
            .fetch({
                withRelated: [{
                    emails: function (query) {
                        query.where({ active: 1 }).select();
                    },
                }],
            })
        asset = asset.toJSON();

        await Promise.all(asset.emails.map(async (email) => {
            await sendStakingProjectAvailableEmail(email, project);
        }));

        // send notification to catch all address
        await sendStakingProjectAvailableEmail(
            {
                address: process.env.CATCH_ALL_EMAIL_ADDRESS,
                token: 'whenwillifindlove',
            },
            project,
        )

    } catch (err) {
        console.log(err);
    }
}

module.exports = sendStakingProjectAvailableNotification;