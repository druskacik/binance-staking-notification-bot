const CronJob = require('cron').CronJob;

const getStakingInfo = require('../api/get-staking-info');
const getDefiStakingInfo = require('../api/get-defi-staking');
const getActivitiesInfo = require('../api/get-activities');
const updateStakingInfo = require('../db/update-staking-info');
const updateDefiStakingInfo = require('../db/update-defi-staking');
const updateActivites = require('../db/update-activitites');

let jobIsRunning = false;

const job = new CronJob({
    cronTime: '*/10 * * * * *',
    onTick: async () => {
        if (!jobIsRunning) {
            jobIsRunning = true;
            console.log('Running cronjob: fetching Binance staking options ...');
            try {
    
                const data = await getStakingInfo();
                await updateStakingInfo(data);

                const defiData = await getDefiStakingInfo();
                await updateDefiStakingInfo(defiData);

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
})

job.start();