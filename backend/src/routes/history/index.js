const express = require('express');

const knex = require('../../../connection');

const createExcel = require('./create-excel').createExcel;
const createExcelDefi = require('./create-excel').createExcelDefi;

const logExport = require('../../db/log-export');

const router = express.Router();

router.route('/options')
    .get(async (req, res) => {
        try {
            const assets = await knex('asset').select();

            await Promise.all(assets.map(async (asset) => {
                const durationRows = await knex('project')
                    .distinct('duration')
                    .where({
                        asset_id: asset.id,
                    });

                const durations = durationRows.map(row => row.duration);
                asset.durations = durations.sort((a, b) => b - a);
            }));

            assets.sort((a, b) => {
                if (a.asset_name < b.asset_name) { return -1; }
                if (a.asset_name > b.asset_name) { return 1; }
                return 0;
            });

            const assetsDefi = await knex('asset_defi').select();
            assetsDefi.sort((a, b) => {
                if (a.asset_name < b.asset_name) { return -1; }
                if (a.asset_name > b.asset_name) { return 1; }
                return 0;
            });

            const assetsLockedSavings = await knex('asset_locked_savings').select();
            await Promise.all(assetsLockedSavings.map(async (asset) => {
                const durationRows = await knex('project_locked_savings')
                    .distinct('duration')
                    .where({
                        asset_id: asset.id,
                    });

                const durations = durationRows.map(row => row.duration);
                asset.durations = durations.sort((a, b) => b - a);
            }));

            res.status(200)
                .json({
                    optionsLocked: assets,
                    optionsDefi: assetsDefi,
                    optionsLockedSavings: assetsLockedSavings,
                });
        } catch (err) {
            console.log(err);
            res.status(err.status || 500)
                .json({
                    status: err.status || 500,
                    message: err.message,
                });
        }
    });

router.route('/locked')
    .get(async (req, res) => {
        try {
            let assetName = req.query.assetName;
            assetName = assetName.toUpperCase();
            const duration = req.query.duration;
            const numDays = req.query.numDays;
            const currentTimestamp = Date.now();

            await logExport(assetName, 'locked', numDays, duration);

            let historyDataQuery = knex('availability_history_locked')
                .where({
                    asset_name: assetName,
                    duration,
                });

            if (numDays) {
                const lastTimestampToFetch = currentTimestamp - (24 * 60 * 60 * 1000 * numDays);
                const lastDatetimeToFetch = new Date(lastTimestampToFetch);
                historyDataQuery = historyDataQuery
                    .where('created_at', '>', lastDatetimeToFetch);
            }

            const historyData = await historyDataQuery.select();

            const workBook = createExcel(assetName, duration, historyData);

            res.set({
                'Content-Disposition': `attachment; filename="${assetName}-${duration}-locked-availability-history-${currentTimestamp}.xlsx"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            workBook.xlsx.write(res);
        } catch (err) {
            console.log(err);
            res.status(err.status || 500)
                .json({
                    status: err.status || 500,
                    message: err.message,
                });
        }
    });

router.route('/defi')
    .get(async (req, res) => {
        try {
            let assetName = req.query.assetName;
            assetName = assetName.toUpperCase();
            const numDays = req.query.numDays;
            const currentTimestamp = Date.now();

            await logExport(assetName, 'defi', numDays);

            let historyDataQuery = knex('availability_history_defi')
                .where({
                    asset_name: assetName,
                });

            if (numDays) {
                const lastTimestampToFetch = currentTimestamp - (24 * 60 * 60 * 1000 * numDays);
                const lastDatetimeToFetch = new Date(lastTimestampToFetch);
                historyDataQuery = historyDataQuery
                    .where('created_at', '>', lastDatetimeToFetch);
            }

            const historyData = await historyDataQuery.select();

            const workBook = createExcelDefi(assetName, historyData);

            res.set({
                'Content-Disposition': `attachment; filename="${assetName}-FLEXIBLE-defi-availability-history-${currentTimestamp}.xlsx"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            workBook.xlsx.write(res);
        } catch (err) {
            console.log(err);
            res.status(err.status || 500)
                .json({
                    status: err.status || 500,
                    message: err.message,
                });
        }
    });

router.route('/locked-savings')
    .get(async (req, res) => {
        try {
            let assetName = req.query.assetName;
            assetName = assetName.toUpperCase();
            const duration = req.query.duration;
            const numDays = req.query.numDays;
            const currentTimestamp = Date.now();

            await logExport(assetName, 'locked-savings', numDays, duration);

            let historyDataQuery = knex('availability_history_locked_savings')
                .where({
                    asset_name: assetName,
                    duration,
                });

            if (numDays) {
                const lastTimestampToFetch = currentTimestamp - (24 * 60 * 60 * 1000 * numDays);
                const lastDatetimeToFetch = new Date(lastTimestampToFetch);
                historyDataQuery = historyDataQuery
                    .where('created_at', '>', lastDatetimeToFetch);
            }

            const historyData = await historyDataQuery.select();

            const workBook = createExcel(assetName, duration, historyData, 'locked savings');

            res.set({
                'Content-Disposition': `attachment; filename="${assetName}-${duration}-locked-savings-history-${currentTimestamp}.xlsx"`,
                'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });

            workBook.xlsx.write(res);
        } catch (err) {
            console.log(err);
            res.status(err.status || 500)
                .json({
                    status: err.status || 500,
                    message: err.message,
                });
        }
    });

module.exports = router;
