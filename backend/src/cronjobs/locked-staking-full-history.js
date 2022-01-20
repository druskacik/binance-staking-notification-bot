const CronJob = require('cron').CronJob;

const getStakingInfo = require('../api/get-staking-info');
const logLockedStakingHistory = require('../db/log-locked-staking-history');

let jobIsRunning = false;

const job = new CronJob({
    cronTime: '5/10 * * * * *',
    onTick: async () => {
        if (!jobIsRunning) {
            jobIsRunning = true;
            console.log('Running cronjob: logging locked staking history ...');
            try {
                const data = await getStakingInfo();
                await logLockedStakingHistory(data);

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
