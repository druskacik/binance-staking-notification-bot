const CronJob = require('cron').CronJob;

const getActivitiesInfo = require('../api/get-activities');
const updateActivites = require('../db/update-activitites');

let jobIsRunning = false;

const job = new CronJob({
    cronTime: '4/10 * * * * *',
    onTick: async () => {
        if (!jobIsRunning) {
            jobIsRunning = true;
            console.log('Running cronjob: fetching activities ...');
            try {
                const activitiesData = await getActivitiesInfo();
                await updateActivites(activitiesData);

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
