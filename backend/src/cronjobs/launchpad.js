const CronJob = require('cron').CronJob;

const getLaunchpadInfo = require('../api/get-launchpad');
const updateLaunchpad = require('../db/update-launchpad');

let jobIsRunning = false;

const job = new CronJob({
    cronTime: '55 * * * * *',
    onTick: async () => {
        if (!jobIsRunning) {
            jobIsRunning = true;
            console.log('Running cronjob: [LAUNCHPAD] ...');
            try {
                const data = await getLaunchpadInfo();
                await updateLaunchpad(data);

                console.log('Cron [LAUNCHPAD] run successfully !');
            } catch (err) {
                console.log(err);
            } finally {
                jobIsRunning = false;
            }
        } else {
            console.log('Job [LAUNCHPAD] still running, aborting.');
        }
    },
});

job.start();
