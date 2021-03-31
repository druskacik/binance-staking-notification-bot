require('dotenv').config();
const mailer = require('nodemailer');

const environment = process.env.NODE_ENV || 'development';

const transporter = mailer.createTransport({
	host: process.env.MAIL_HOST,
	port: process.env.MAIL_PORT,
	secure: process.env.MAIL_PORT === '465',
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS,
	},
}, {
	from: process.env.MAIL_FROM,
});

const sendMail = async (options) => {
	const info = await transporter.sendMail(options);
	if (environment === 'development') {
		console.log(`[EMAIL] Test preview URL: ${mailer.getTestMessageUrl(info)}`);
	}
};

module.exports = sendMail;