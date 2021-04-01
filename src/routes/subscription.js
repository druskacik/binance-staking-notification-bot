const express = require('express');
const randomstring = require('randomstring');

const knex = require('../../connection');
const Email = require('../models/Email');
const sendConfirmationEmail = require('../mailer/emails/confirm-subscription');

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

			await knex('email')
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
		let email = await Email.forge().where({
			address: request.email,
		}).fetchAll();
		email = email.toJSON();
	
		let emailID = null;
	
		if (email.length === 0) {
	
			// email not in DB, create
			let newEmailRow = await new Email({
				address: request.email,
				active: 1,
				subscribe_new_assets: request.subscribeNewAssets,
				token: token,
			}).save();
			newEmailRow = newEmailRow.toJSON();
	
			emailID = newEmailRow.id;
	
		} else {
	
			// update existing email row
	
			emailID = email[0].id;
	
			await knex('email')
				.where({
					id: emailID,
				})
				.update({
					active: 1,
					subscribe_new_assets: request.subscribeNewAssets,
					token: token,
				})
	
			// delete existing settings
			await knex('email_asset_notification')
				.where({
					email_id: emailID
				})
				.del()
		}
	
		const subscribedAssets = request.subscribedAssetsIDs.map((assetID) => ({
			email_id: emailID,
			asset_id: assetID,
		}))
	
		await knex('email_asset_notification').insert(subscribedAssets);

	} catch (err) {

		throw err;

	}

}

module.exports = router;