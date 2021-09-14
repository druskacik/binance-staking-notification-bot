const CronJob = require('cron').CronJob;

const getDefiStakingInfo = require('../api/get-defi-staking');
const logDefiHistory = require('../db/log-defi-history');

let jobIsRunning = false;

const job = new CronJob({
    // every minute, seems reasonable for now
    cronTime: '16 * * * * *',
    onTick: async () => {
        if (!jobIsRunning) {
            jobIsRunning = true;
            console.log('Running cronjob: logging defi history ...');
            try {
                const defiData = await getDefiStakingInfo();
                await logDefiHistory(defiData);

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
