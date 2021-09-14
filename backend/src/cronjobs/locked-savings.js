const CronJob = require('cron').CronJob;

const getLockedSavings = require('../api/get-locked-savings');
const updateLockedSavingsInfo = require('../db/update-locked-savings');

let jobIsRunning = false;

const job = new CronJob({
    cronTime: '6/10 * * * * *',
    onTick: async () => {
        if (!jobIsRunning) {
            jobIsRunning = true;
            console.log('Running cronjob: fetching locked savings options ...');
            try {
                const data = await getLockedSavings();
                await updateLockedSavingsInfo(data);

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
