const CronJob = require('cron').CronJob;
const dayjs = require('dayjs');

const User = require('../models/User');

const sendTelegramMessage = require('../services/telegram-bot');

let jobIsRunning = false;

const job = new CronJob({
    cronTime: '26 * * * * *',
    onTick: async () => {
        if (!jobIsRunning) {
            jobIsRunning = true;
            console.log('Running cronjob: ending user subscriptions ...');
            try {
                let currentTime = dayjs();
                currentTime = currentTime.format('YYYY-MM-DD HH:mm:ss');

                const usersToEndSubscription = await User.query(function (qb) {
                    qb.where({
                        is_pro: 1,
                    })
                        .andWhere('subscription_end_date', '<', currentTime)
                        .whereNull('address'); // only rows of Telegram users, not email users
                })
                    .fetchAll();

                const usersToEndSubscriptionJSON = usersToEndSubscription.toJSON();
                await Promise.all(usersToEndSubscriptionJSON.map(async (user) => {
                    // send telegram message about subscription end
                    const chatID = user.telegram_chat_id;
                    await sendTelegramMessage('subscription-ended', chatID);
                }));

                await Promise.all(usersToEndSubscription.map(async (userToEndSubscription) => {
                    await userToEndSubscription.save({
                        is_pro: 0,
                    });
                }));

                console.log('Cron run successfully !');
            } catch (err) {
                console.log(err);
            } finally {
                jobIsRunning = false;
            }
        } else {
            console.log('Job still running, aborting.');
        }
    },
});

job.start();
