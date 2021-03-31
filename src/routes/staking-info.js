const express = require('express');

const Asset = require('../models/Asset');

const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {

            let assets = await Asset
                .fetchAll({
                    withRelated: ['projects']
                });
            assets = assets.toJSON();

            res.status(200)
                .json(assets);
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