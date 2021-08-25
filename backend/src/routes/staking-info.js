const express = require('express');

const Asset = require('../models/Asset');
const AssetDefi = require('../models/AssetDefi');

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {

            let assetsLocked = await Asset.fetchAll();
            assetsLocked = assetsLocked.toJSON();

            let assetsDefi = await AssetDefi.fetchAll();
            assetsDefi = assetsDefi.toJSON();

            res.status(200)
                .json({
                    assetsLocked,
                    assetsDefi,
                });
        } catch (err) {
            console.log(err);
            res.status(err.status || 500)
                .json({
                    status: err.status || 500,
                    message: err.message,
                })
            }
    })


module.exports = router;