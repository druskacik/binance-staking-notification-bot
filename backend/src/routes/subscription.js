const express = require('express');
const randomstring = require('randomstring');

const knex = require('../../connection');
const User = require('../models/User');
const sendConfirmationEmail = require('../services/mailer/emails/confirm-subscription');

const router = express.Router();

router.route('/create')
    .post(async (req, res) => {
        try {
            const request = req.body;
            const confirmationToken = randomstring.generate(20);

            await knex('subscription_request').insert({
                token: confirmationToken,
                request_json: JSON.stringify(request),
                active: 1,
            });

            // send email
            const confirmationUrl = `${process.env.BASE_URL}/api/subscription/confirm?token=${confirmationToken}`;
            await sendConfirmationEmail(request.email, confirmationUrl);

            res.status(200)
                .json({
                    message: 'Subscription request successful !',
                    token: confirmationToken,
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

router.route('/confirm')
	.get(async (req, res) => {
		try {
			const token = req.query.token;

			const request = await knex('subscription_request')
				.where({
					token,
				})
				.select();
			if (request.length === 0) {
				throw new Error("Unknown or expired confirmation token !");
			}

			if (request[0].active === 1) {
				await confirmSubscription(JSON.parse(request[0].request_json), token);
		
				await knex('subscription_request')
					.where({
						token,
					})
					.update({
						active: 0,
					})
			}

			// TODO: create success page
			// res.status(200)
			// 	.sendFile(path.join(__dirname, '../../pages/subscription-confirmed/index.html'));

			res.status(200)
				.send('<h1>Subscription confirmed !</h1>')

		} catch (err) {

			console.log(err);

			res.status(err.status || 500)
				.json({
				status: err.status || 500,
				message: err.message,
				})
			}
	})

router.route('/unsubscribe')
	.get(async (req, res) => {
		try {
			const token = req.query.token;

			await knex('user')
				.whereNotNull('address')
				.where({
					token,
				})
				.update({
					active: 0,
				})

			// TODO: create success page
			// res.status(200)
			// 	.sendFile(path.join(__dirname, '../../pages/unsubscribe-page/index.html'));

			res.status(200)
				.send('<h1>Unsubscribed !</h1>')

		} catch (err) {

			console.log(err);
			res.status(err.status || 500)
				.json({
				status: err.status || 500,
				message: err.message,
				})
			}
	})

const confirmSubscription = async (request, token) => {

	try {
		let user = await User.forge().where({
			address: request.email,
		}).fetchAll();
		user = user.toJSON();
	
		let userID = null;
	
		if (user.length === 0) {
	
			// email not in DB, create
			let newUserRow = await new User({
				address: request.email,
				active: 1,
				subscribe_new_assets: request.subscribeNewAssetsLocked,
				subscribe_defi: request.subscribeNewAssetsDefi,
				subscribe_activities: request.subscribeActivities,
				token: token,
			}).save();
			newUserRow = newUserRow.toJSON();
	
			userID = newUserRow.id;
	
		} else {
	
			// update existing email row
	
			userID = user[0].id;
	
			await knex('user')
				.where({
					id: userID,
				})
				.update({
					active: 1,
					subscribe_new_assets: request.subscribeNewAssetsLocked,
					subscribe_defi: request.subscribeNewAssetsDefi,
					subscribe_activities: request.subscribeActivities,
					token: token,
				})
	
			// delete existing settings
			await knex('user_asset_notification')
				.where({
					user_id: userID
				})
				.del()
			await knex('user_defi_notification')
				.where({
					user_id: userID
				})
				.del()
		}
	
        // for legacy subscription requests, keep this here for a while
        // delete it when the support will be fully dropped
		let subscribedAssetsLocked = request.subscribedAssetsLocked || [];
        subscribedAssetsLocked = subscribedAssetsLocked.map((assetID) => ({
			user_id: userID,
			asset_id: assetID,
		}));
		if (subscribedAssetsLocked.length > 0) {
			await knex('user_asset_notification').insert(subscribedAssetsLocked);
		}

        let subscribedAssetsDefi = request.subscribedAssetsDefi || [];
		subscribedAssetsDefi = subscribedAssetsDefi.map((assetID) => ({
			user_id: userID,
			asset_defi_id: assetID,
		}));
		if (subscribedAssetsDefi.length > 0) {
			await knex('user_defi_notification').insert(subscribedAssetsDefi);
		}
	

	} catch (err) {

		throw err;

	}

}

module.exports = router;