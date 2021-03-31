const CronJob = require('cron').CronJob;

const getStakingInfo = require('../api/get-staking-info');
const updateStakingInfo = require('../db/update-staking-info');

const job = new CronJob({
    cronTime: '*/10 * * * * *',
    onTick: async () => {
        console.log('Running cronjob: fetching Binance staking options ...');
        try {

            const data = await getStakingInfo();
            await updateStakingInfo(data);

            console.log('Cron run successfully !');

        } catch (err) {
            console.log(err);
        }
  },
})

job.start();