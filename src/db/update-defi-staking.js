const knex = require('../../connection');

const AssetDefi = require('../models/AssetDefi');
const ProjectDefi = require('../models/ProjectDefi');

const sendNewDefiAssetAvailableNotifications = require('../notifications/defi/new-asset-available');
const sendDefiStakingProjectAvailableNotification = require('../notifications/defi/project-available');

const updateDefiStakingInfo = async (data) => {

    try {
        
        const response = await Promise.all(data.map(async (item) => {

            const assetName = item.asset;
            let assetID = null;

            let assetRow = await knex('asset_defi')
                .where({ asset_name: assetName })
                .select()

            if (assetRow.length === 0) {
                console.log('Defi asset not in DB, adding', assetName);
                let newAssetRow = await new AssetDefi({
                    asset_name: assetName
                }).save();
                newAssetRow = newAssetRow.toJSON();

                assetID = newAssetRow.id;

                await sendNewDefiAssetAvailableNotifications({
                    name: assetName,
                    projects: item.products,
                })

            } else {
                assetRow = assetRow[0];
                assetID = assetRow.id;
            }

            // TODO: item.projects contains non-flexible options !
            await updateDefiProjects(item.products, assetID);

        }))

    } catch (err) {
        console.log(err);
    }
}

const updateDefiProjects = async (projects, assetID) => {
    try {

        let newProjectsResponse = await Promise.all(projects.map(async (project) => {
            let projectDB = await ProjectDefi.forge().where({
                binance_id: project.id,
                asset_id: assetID
            }).fetchAll();

            projectDB = projectDB.toJSON();
            
            if (projectDB.length === 0) {
                await new ProjectDefi({
                    binance_id: project.id,
                    asset_name: project.asset,
                    product_name: project.productName,
                    asset_id: assetID,
                    duration_flexible: 1,
                    sold_out: project.sellOut,
                    interest_rate: project.annualInterestRate,
                    min_purchase_amount: project.minPurchaseAmount,
                    max_purchase_amount: project.maxInvestAmount,
                    left_available: project.leftAvailable,
                }).save()
                return project;
            } else {

                projectDB = projectDB[0];

                await knex('project_defi')
                    .where({
                        binance_id: project.id,
                        asset_id: assetID
                    })
                    .update({
                        sold_out: project.sellOut,
                        interest_rate: project.annualInterestRate,
                        min_purchase_amount: project.minPurchaseAmount,
                        max_purchase_amount: project.maxInvestAmount,
                        left_available: project.leftAvailable,
                    })
                    
                
                if (projectDB.sold_out && !project.sellOut) {
                    console.log(`Project became available ! Asset: ${project.asset} `);
                    return project;
                }
            }
        }))
        newProjectsResponse = newProjectsResponse.filter(p => Boolean(p));

        if (newProjectsResponse.length > 0) {
            await sendDefiStakingProjectAvailableNotification(newProjectsResponse, assetID);
        }

    } catch (err) {
        console.log(err);
    }
}

module.exports = updateDefiStakingInfo;