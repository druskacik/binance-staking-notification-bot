const knex = require('../../connection');

const Project = require('../models/Project');

const logLockedStakingHistory = async (data) => {
    try {
        await Promise.all(data.map(async (item) => {
            const assetName = item.asset;

            let assetRow = await knex('asset')
                .where({ asset_name: assetName })
                .select();

            // if asset is not in DB, do nothing ... it will be added by another cronjob
            if (assetRow.length > 0) {
                assetRow = assetRow[0];
                const assetID = assetRow.id;
                await logLockedStakingProjects(item.projects, assetID, assetName);
            }
        }));
    } catch (err) {
        console.log(err);
    }
};

const logLockedStakingProjects = async (projects, assetID, assetName) => {
    try {
        await Promise.all(projects.map(async (project) => {
            let projectDB = await Project.where({
                binance_id: project.id,
                asset_id: assetID,
            }).fetch({
                require: false,
            });

            // if project is not in DB, do nothing ... it will be added by another cronjob
            if (projectDB) {
                projectDB = projectDB.toJSON();
                const projectID = projectDB.id;
                const leftAvailable = parseFloat(project.upLimit) - parseFloat(project.purchased);

                await knex('history_locked_staking_full')
                    .insert({
                        asset_name: assetName,
                        project_id: projectID,
                        sold_out: project.sellOut,
                        left_available: leftAvailable,
                    });
            }
        }));
    } catch (err) {
        console.log(err);
    }
};

module.exports = logLockedStakingHistory;
