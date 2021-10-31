const CronJob = require('cron').CronJob;

const knex = require('../../connection');

// deletes records from availability_history_defi older than 31 days
// this is done so that DB doesn't become too big
const job = new CronJob({
    // every day at 00:42
    cronTime: '42 0 * * *',
    onTick: async () => {
        console.log('Running cronjob: deleting-old-staking-history ...');
        try {

            const numDaysToKeep = 31;

            const currentTimestamp = Date.now();
            const lastTimestampToKeep = currentTimestamp - (24 * 60 * 60 * 1000 * numDaysToKeep);
            const lastDatetimeToKeep = new Date(lastTimestampToKeep);

            const nDeleted = await knex('availability_history_defi')
                .where('created_at', '<', lastDatetimeToKeep)
                .del();

            console.log(`Deleted ${nDeleted} records from availability_history_defi table.`)
            console.log('Cron deleting-old-staking-history run successfully !');
        } catch (err) {
            console.log(err);
        }
    },
});

job.start();
