const CronJob = require('cron').CronJob;

const getDefiStakingInfo = require('../api/get-defi-staking');
const updateDefiStakingInfo = require('../db/update-defi-staking');

let jobIsRunning = false;

const job = new CronJob({
    cronTime: '2/10 * * * * *',
    onTick: async () => {
        if (!jobIsRunning) {
            jobIsRunning = true;
            console.log('Running cronjob: fetching DeFi staking options ...');
            try {
                const defiData = await getDefiStakingInfo();
                await updateDefiStakingInfo(defiData);

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
