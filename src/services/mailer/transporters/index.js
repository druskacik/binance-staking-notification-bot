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
    11: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_12,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_12,
    }),
    12: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_13,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_13,
    }),
    13: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_14,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_14,
    }),
    14: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_15,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_15,
    }),
    15: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_16,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_16,
    }),
    16: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_17,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_17,
    }),
    17: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_18,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_18,
    }),
    18: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_19,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_19,
    }),
    19: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_20,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_20,
    }),
    20: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_21,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_21,
    }),
    21: mailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_PORT === '465',
        auth: {
            user: process.env.MAIL_USER_22,
            pass: process.env.MAIL_PASS,
        },
    }, {
        from: process.env.MAIL_USER_22,
    }),
}

module.exports = transporters;