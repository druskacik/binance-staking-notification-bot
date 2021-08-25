require('dotenv').config();
const mailer = require('nodemailer');

const transporters = require('./transporters');

const environment = process.env.NODE_ENV || 'development';

const sendMail = async (options, transpoterIndex = 0) => {
	const transporter = transporters[transpoterIndex];
	const info = await transporter.sendMail(options);
	if (environment === 'development') {
		console.log(`[EMAIL] Test preview URL: ${mailer.getTestMessageUrl(info)}`);
	}
};

module.exports = sendMail;