const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const subscription = require('./routes/subscription');
const stakingInfo = require('./routes/staking-info');
const telegramBot = require('./routes/telegram-webhook');
const availabilityHistory = require('./routes/history');

app.use(cors({
    exposedHeaders: ['Content-Disposition'],
}));

// enforce HTTPS
const requireHTTPS = (req, res, next) => {
    // The 'x-forwarded-proto' check is for Heroku
    if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === "production") {
        return res.redirect('https://' + req.get('host') + req.url);
    }
    next();
}

app.enable('trust proxy');
app.use(requireHTTPS);

// starts all cronjobs
require('./cronjobs');

app.use(bodyParser.json());

app.use('/subscription', subscription);
app.use('/get-staking-info', stakingInfo);
app.use('/history', availabilityHistory);
app.use(`/telegram${process.env.TELEGRAM_BOT_TOKEN}`, telegramBot);

module.exports = app;