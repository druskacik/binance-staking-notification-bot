const knex = require('../../connection');

const sendNewActivityAvailableNotifications = require('../notifications/activities');

const updateActivities = async (data) => {
    try {
        const response = await Promise.all(data.map(async (item) => {
            const dbRows = await knex('saving_activity')
                .where({
                    binance_id: item.projectId,
                })
                .select();

            if (dbRows.length === 0) {
                // new activity !
                console.log('New activity !', item.projectName);

                await knex('saving_activity')
                    .insert({
                        asset_name: item.asset,
                        duration: item.duration,

                        binance_id: item.projectId,
                        project_name: item.projectName,

                        interest_rate: item.interestRate,
                        interest_per_lot: item.interestPerLot,

                        lot_size: item.lotSize,
                        max_lots_per_user: item.maxLotsPerUser,
                        lots_up_limit: item.lotsUpLimit,
                    });

                await sendNewActivityAvailableNotifications(item);
            }
        }));
    } catch (err) {
        console.log(err);
    }
};

module.exports = updateActivities;
