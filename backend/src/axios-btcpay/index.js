require('dotenv').config();

const axios = require('axios');

const axiosBtcpay = axios.create();

axiosBtcpay.defaults.headers.common['Authorization'] = `token ${process.env.BTCPAY_API_KEY}`;

module.exports = axiosBtcpay;