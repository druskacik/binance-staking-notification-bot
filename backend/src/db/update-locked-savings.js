const knex = require('../../connection');

const AssetLockedSavings = require('../models/AssetLockedSavings');
const ProjectLockedSavings = require('../models/ProjectLockedSavings');

const sendNewLockedSavingsAssetAvailableNotifications = require('../notifications/locked-savings/new-asset-available');
const sendLockedSavingsProjectAvailableNotification = require('../notifications/locked-savings/project-available');

const updateLockedSavingsInfo = async (data) => {
    try {
        const response = await Promise.all(data.map(async (item) => {
            const assetName = item.asset;
            let assetID = null;

            let assetRow = await knex('asset_locked_savings')
                .where({ asset_name: assetName })
                .select();

            if (assetRow.length === 0) {
                console.log('Locked savings asset not in DB, adding', assetName);
                let newAssetRow = await new AssetLockedSavings({
                    asset_name: assetName,
                }).save();
                newAssetRow = newAssetRow.toJSON();

                assetID = newAssetRow.id;

                await sendNewLockedSavingsAssetAvailableNotifications({
                    name: assetName,
                    projects: item.list,
                });
            } else {
                assetRow = assetRow[0];
                assetID = assetRow.id;
            }

            await updateLockedSavingsProjects(item.list, assetID);
        }));
    } catch (err) {
        console.log(err);
    }
};

const updateLockedSavingsProjects = async (projects, assetID) => {
    try {
        let newProjectsResponse = await Promise.all(projects.map(async (project) => {
            let projectDB = await ProjectLockedSavings.forge().where({
                project_id: project.projectId,
                asset_id: assetID,
            }).fetchAll();

            projectDB = projectDB.toJSON();

            const soldOut = projectIsSoldOut(project);

            if (projectDB.length === 0) {
                await new ProjectLockedSavings({
                    project_id: project.projectId,
                    asset_name: project.asset,
                    asset_id: assetID,
                    duration: project.duration,
                    sold_out: soldOut,
                    interest_rate: project.interestRate,
                }).save();
                return project;
            } else {
                projectDB = projectDB[0];

                await knex('project_locked_savings')
                    .where({
                        project_id: project.projectId,
                        asset_id: assetID,
                    })
                    .update({
                        sold_out: soldOut,
                    });

                if (projectDB.sold_out && !soldOut) {
                    console.log(`Project became available ! Asset: ${project.asset} `);

                    await knex('availability_history_locked_savings').insert({
                        asset_name: project.asset,
                        duration: project.duration,
                        project_id: projectDB.id,
                        became_sold_out: 0,
                    });

                    return project;
                }

                if (!projectDB.sold_out && soldOut) {
                    // project became sold out, log to database
                    await knex('availability_history_locked_savings').insert({
                        asset_name: project.asset,
                        duration: project.duration,
                        project_id: projectDB.id,
                        became_sold_out: 1,
                    });
                }
            }
        }));
        newProjectsResponse = newProjectsResponse.filter(p => Boolean(p));

        // compute how many lots are available to purchase
        newProjectsResponse = newProjectsResponse.map(project => ({
            ...project,
            lotsAvailable: Number(project.lotsUpLimit) - Number(project.lotsPurchased),
        }));

        if (newProjectsResponse.length > 0) {
            await sendLockedSavingsProjectAvailableNotification(newProjectsResponse, assetID);
        }
    } catch (err) {
        console.log(err);
    }
};

// TODO: not sure if this is completely correct
const projectIsSoldOut = (project) => {
    // if (project.status === 'PURCHASED') {
    //     return true;
    // }
    // temporary hotfix
    if (project.status !== 'PURCHASING') {
        return true;
    }
    return Number(project.lotsPurchased) + Number(project.lotsLowLimit) > Number(project.lotsUpLimit);
};

module.exports = updateLockedSavingsInfo;
