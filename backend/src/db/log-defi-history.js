const knex = require('../../connection');

const ProjectDefi = require('../models/ProjectDefi');

const logDefiHistory = async (data) => {
    try {
        await Promise.all(data.map(async (item) => {
            const assetName = item.asset;

            let assetRow = await knex('asset_defi')
                .where({ asset_name: assetName })
                .select();

            // if asset is not in DB, do nothing ... it will be added by another cronjob
            if (assetRow.length > 0) {
                assetRow = assetRow[0];
                const assetID = assetRow.id;
                await logDefiProjects([...item.products, ...item.projects], assetID, assetName);
            }
        }));
    } catch (err) {
        console.log(err);
    }
};

const logDefiProjects = async (projects, assetID, assetName) => {
    try {
        await Promise.all(projects.map(async (project) => {
            let projectDB = await ProjectDefi.forge().where({
                binance_id: project.id,
                asset_id: assetID,
            }).fetchAll();

            projectDB = projectDB.toJSON();

            // if project is not in DB, do nothing ... it will be added by another cronjob
            if (projectDB.length > 0) {
                projectDB = projectDB[0];
                const projectID = projectDB.id;

                await knex('availability_history_defi')
                    .insert({
                        asset_name: assetName,
                        project_defi_id: projectID,
                        sold_out: project.sellOut,
                        left_available: project.leftAvailable,
                    });
            }
        }));
    } catch (err) {
        console.log(err);
    }
};

module.exports = logDefiHistory;
