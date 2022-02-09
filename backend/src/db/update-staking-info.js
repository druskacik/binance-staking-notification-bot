const knex = require('../../connection');

const Asset = require('../models/Asset');
const Project = require('../models/Project');

const sendStakingProjectAvailableNotification = require('../notifications/project-available');
const sendNewAssetAvailableNotifications = require('../notifications/new-asset-available');

const updateStakingInfo = async (data) => {
    try {
        await Promise.all(data.map(async (item) => {
            const assetName = item.asset;
            let assetID = null;

            let assetRow = await knex('asset')
                .where({ asset_name: assetName })
                .select();

            if (assetRow.length === 0) {
                console.log('Asset not in DB, adding', assetName);
                let newAssetRow = await new Asset({
                    asset_name: assetName,
                }).save();
                newAssetRow = newAssetRow.toJSON();

                assetID = newAssetRow.id;

                const projects = item.projects.map((project) => {
                    // if annualInterestRate and dailyInterestRate are 0 then interest is on the extra asset
                    const annualInterestRate = parseFloat(project.config.annualInterestRate) || parseFloat(project.config.extraAnnualInterestRate);
                    const dailyInterestRate = parseFloat(project.config.dailyInterestRate) || parseFloat(project.config.extraDailyInterestRate);

                    return {
                        duration: project.duration,
                        extraAsset: project.config.extraInterestAsset,
                        annualInterestRate,
                        dailyInterestRate,
                    }
                });

                let extraAsset;
                if (projects.length > 0) {
                    extraAsset = projects[0].extraAsset;
                }

                await sendNewAssetAvailableNotifications({
                    name: assetName,
                    projects,
                    extraAsset,
                });
            } else {
                assetRow = assetRow[0];
                assetID = assetRow.id;
            }

            await updateProjects(item.projects, assetID);
        }));
    } catch (err) {
        console.log(err);
    }
};

const updateProjects = async (projects, assetID) => {
    try {
        let newProjectsResponse = await Promise.all(projects.map(async (project) => {
            let projectDB = await Project.forge().where({
                binance_id: project.id,
                asset_id: assetID,
            }).fetchAll();

            projectDB = projectDB.toJSON();

            // if annualInterestRate and dailyInterestRate are 0 then interest is on the extra asset
            const annualInterestRate = parseFloat(project.config.annualInterestRate) || parseFloat(project.config.extraAnnualInterestRate);
            const dailyInterestRate = parseFloat(project.config.dailyInterestRate) || parseFloat(project.config.extraDailyInterestRate);

            if (projectDB.length === 0) {
                await new Project({
                    binance_id: project.id,
                    asset_name: project.asset,
                    asset_id: assetID,
                    duration: project.duration,
                    sold_out: project.sellOut,
                    interest_rate: annualInterestRate,
                    daily_interest_rate: dailyInterestRate,
                    min_purchase_amount: project.config.minPurchaseAmount,
                    max_purchase_amount: project.config.maxPurchaseAmountPerUser,
                    up_limit: project.upLimit,
                    issue_start_time: new Date(Number(project.issueStartTime)),
                    issue_end_time: new Date(Number(project.issueEndTime)),
                    extra_asset_name: project.config.extraInterestAsset,
                }).save();
                // TODO: user gets notified as if this project was previously sold out, when in reality it's a completely new staking option !
                return {
                    duration: project.duration,
                    extraAsset: project.config.extraInterestAsset,
                    leftAvailable: project.upLimit,
                    annualInterestRate,
                    dailyInterestRate,
                };
            } else {
                projectDB = projectDB[0];

                await knex('project')
                    .where({
                        binance_id: project.id,
                        asset_id: assetID,
                    })
                    .update({
                        asset_name: project.asset,
                        duration: project.duration,
                        sold_out: project.sellOut,
                        interest_rate: annualInterestRate,
                        daily_interest_rate: dailyInterestRate,
                        min_purchase_amount: project.config.minPurchaseAmount,
                        max_purchase_amount: project.config.maxPurchaseAmountPerUser,
                        up_limit: project.upLimit,
                        issue_start_time: new Date(Number(project.issueStartTime)),
                        issue_end_time: new Date(Number(project.issueEndTime)),
                        extra_asset_name: project.config.extraInterestAsset,
                    });

                if (projectDB.sold_out && !project.sellOut) {
                    console.log(`Project became available ! Asset: ${project.asset} Duration: ${project.duration}`);

                    const leftAvailable = parseFloat(project.upLimit) - parseFloat(project.purchased);
                    await knex('availability_history_locked').insert({
                        asset_name: project.asset,
                        duration: project.duration,
                        project_id: projectDB.id,
                        left_available: leftAvailable,
                        became_sold_out: 0,
                    });

                    return {
                        duration: project.duration,
                        extraAsset: project.config.extraInterestAsset,
                        annualInterestRate,
                        dailyInterestRate,
                        leftAvailable,
                    };
                } else if (!projectDB.sold_out && project.sellOut) {
                    // project became sold out, log to database

                    const leftAvailable = parseFloat(project.upLimit) - parseFloat(project.purchased);
                    await knex('availability_history_locked').insert({
                        asset_name: project.asset,
                        duration: project.duration,
                        project_id: projectDB.id,
                        left_available: leftAvailable,
                        became_sold_out: 1,
                    });
                }
            }
        }));
        newProjectsResponse = newProjectsResponse.filter(p => Boolean(p));

        if (newProjectsResponse.length > 0) {
            await sendStakingProjectAvailableNotification(newProjectsResponse, assetID, newProjectsResponse[0].extraAsset);
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = updateStakingInfo;
