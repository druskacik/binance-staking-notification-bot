const knex = require('../../connection');

const logExport = async (assetName, stakingType, numberOfDays = null, duration = null) => {
    try {

        await knex('export')
            .insert({
                staking_type: stakingType,
                asset_name: assetName,
                number_of_days: numberOfDays,
                duration,
            })
        
    } catch (err) {
        console.log(err);
    }
}

module.exports = logExport;