require('dotenv').config();
const mailer = require('nodemailer');

const transporters = {
    0: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_FROM,
    }),
    1: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_2,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_2,
    }),
    2: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_3,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_3,
    }),
    3: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_4,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_4,
    }),
    4: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_5,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_5,
    }),
    5: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_6,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_6,
    }),
    6: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_7,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_7,
    }),
    7: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_8,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_8,
    }),
    8: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_9,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_9,
    }),
    9: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_10,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_10,
    }),
    10: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_11,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_11,
    }),
}

module.exports = transporters;