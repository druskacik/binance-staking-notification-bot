const sendNewAssetAvailableEmail = require('../mailer/emails/new-asset');
const Email = require('../models/Email');

const sendNewAssetAvailableNotifications = async (asset) => {
    try {

        let emails = await Email.forge()
            .where({
                subscribe_new_assets: 1,
                active: 1,
            })
            .fetchAll();
        emails = emails.toJSON();

        await Promise.all(emails.map(async (email) => {
            await sendNewAssetAvailableEmail(email, asset);
        }));

        // send notification to catch all address
        await sendNewAssetAvailableEmail(
            {
                address: process.env.CATCH_ALL_EMAIL_ADDRESS,
                token: 'whenwillifindlove',
            },
            asset,
        )

    } catch (err) {
        console.log(err);
    }
}

module.exports = sendNewAssetAvailableNotifications;