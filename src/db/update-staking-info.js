const knex = require('../../connection');

const Asset = require('../models/Asset');
const Project = require('../models/Project');

const sendStakingProjectAvailableNotification = require('../notifications/project-available');

const updateStakingInfo = async (data) => {

    try {
        
        const response = await Promise.all(data.map(async (item) => {
            const assetName = item.asset;
            let assetID = null;

            let assetRow = await knex('asset')
                .where({ asset_name: assetName })
                .select()

            if (assetRow.length === 0) {
                console.log('Asset not in DB', assetName);
                let newAssetRow = await new Asset({
                    asset_name: assetName
                }).save();
                newAssetRow = newAssetRow.toJSON();

                assetID = newAssetRow.id;

                // TODO: notify about new asset





            } else {
                assetRow = assetRow[0];
                assetID = assetRow.id;
            }

            await updateProjects(item.projects, assetID);
        }))

    } catch (err) {
        console.log(err);
    }

}

const updateProjects = async (projects, assetID) => {
    try {
        const newProjectsResponse = await Promise.all(projects.map(async (project) => {
            let projectDB = await Project.forge().where({
                binance_id: project.id,
                asset_id: assetID
            }).fetchAll();

            projectDB = projectDB.toJSON();
            
            if (projectDB.length === 0) {
                await new Project({
                    binance_id: project.id,
                    asset_name: project.asset,
                    asset_id: assetID,
                    duration: project.duration,
                    sold_out: project.sellOut,
                    interest_rate: project.config.annualInterestRate,
                    daily_interest_rate: project.config.dailyInterestRate,
                    min_purchase_amount: project.config.minPurchaseAmount,
                    max_purchase_amount: project.config.maxPurchaseAmountPerUser,
                }).save()
            } else {
                projectDB = projectDB[0];

                if (projectDB.sold_out && !project.sellOut) {
                    console.log(`Project became available ! Asset: ${project.asset} Duration: ${project.duration}`);

                    await sendStakingProjectAvailableNotification(project, assetID);
                }

                await knex('project')
                    .where({
                        binance_id: project.id,
                        asset_id: assetID
                    })
                    .update({
                        asset_name: project.asset,
                        duration: project.duration,
                        sold_out: project.sellOut,
                        interest_rate: project.config.annualInterestRate,
                        daily_interest_rate: project.config.dailyInterestRate,
                        min_purchase_amount: project.config.minPurchaseAmount,
                        max_purchase_amount: project.config.maxPurchaseAmountPerUser,
                    })
                    
            }
        }))
    } catch (err) {
        console.log(err);
    }
}

module.exports = updateStakingInfo;