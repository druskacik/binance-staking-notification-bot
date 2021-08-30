const Mustache = require('mustache');

const knex = require('../../../connection');
const readFileAsync = require('../../utils/read-file-async');
const sendMail = require('../../services/mailer');

const sendBulkEmailAboutPremium = async () => {
    try {

        const usersWithEmail = await knex('user')
            .where({
                active: 1,
            })
            .whereNotNull('address')
            .select();

        const templateText = await readFileAsync(__dirname + '/message.mustache');

        await Promise.all(usersWithEmail.map(async (user) => {
            try {
                console.log(`Sending email to ${user.address} ...`);
                const unsubscribeUrl = `${process.env.BASE_URL}/api/subscription/unsubscribe?token=${user.token}`;
                const text = Mustache.render(templateText, {
                    unsubscribeUrl,
                });

                const options = {
                    to: user.address,
                    subject: 'IMPORTANT: email support will be dropped in 7 days',
                    text,
                  }
              
                const transporterID = user.id % 22;
                await sendMail(options, transporterID);

            } catch (err) {
                console.log(`ERROR WITH EMAIL ${user.address}`);
                console.log(err);
            }
        }))

    } catch (err) {
        console.log(err);
    } finally {
        process.exit();
    }
}

sendBulkEmailAboutPremium();