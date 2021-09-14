const assert = require('assert');
require('dotenv').config();

const sendMail = require('../services/mailer');

describe('email transporters', function () {
    it('should send test email with every email transporter', async function () {
        const options = {
            to: process.env.CATCH_ALL_EMAIL_ADDRESS,
            subject: 'bswatcher email test',
            text: 'test',
        };

        const numberOfTransporters = 22;
        const promises = [];
        for (let i = 0; i < numberOfTransporters; i += 1) {
            const promise = new Promise(async (resolve, reject) => {
                const transporterID = i % numberOfTransporters;
                await sendMail(options, transporterID);
                resolve(true);
            });
            promises.push(promise);
        }
        return Promise.all(promises);
    });
});
