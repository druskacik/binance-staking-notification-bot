const axios = require('axios');
const randomstring = require('randomstring');

const sendTelegramInvoice = async (chatID, {
    subscriptionType,
    previousMessageID,
}) => {
    try {
        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendInvoice`;
        const urlToDeleteMessage = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/deleteMessage`;

        let text;
        let priceLabel;
        let amount;

        switch (subscriptionType) {
            case '1WEEK':
                text = 'Binance Staking Notification Bot subscription for 7 days. Purchasing this service will give you full access to all the bot features for the given period.';
                priceLabel = 'SUBSCRIPTION 7 DAYS';
                amount = 200;
                break;

            case '4WEEK':
                text = 'Binance Staking Notification Bot subscription for 4 weeks. Purchasing this service will give you full access to all the bot features for the given period.';
                priceLabel = 'SUBSCRIPTION 4 WEEKS';
                amount = 500;
                break;

            case '1YEAR':
                text = 'Binance Staking Notification Bot subscription for 1 year. Purchasing this service will give you full access to all the bot features for the given period.';
                priceLabel = 'SUBSCRIPTION 1 YEAR';
                amount = 3000;
                break;

            default:
                text = 'Binance Staking Notification Bot subscription for 7 days. Purchasing this service will give you full access to all the bot features for the given period.';
                priceLabel = 'SUBSCRIPTION 7 DAYS';
                amount = 200;
        }

        // to incorporate or not to incorporate ?
        await axios.get(urlToDeleteMessage, {
            params: {
                chat_id: chatID,
                message_id: previousMessageID,
            },
        });

        const randomHash = randomstring.generate({
            length: 7,
            charset: 'numeric',
        });
        // unique string representing the invoice
        const startParameter = `${randomHash}${Date.now()}`;

        const response = await axios.get(url, {
            params: {
                chat_id: chatID,
                title: 'BSWATCHER SUBSCRIPTION',
                description: text,
                payload: 'BSWATCHER-SUBSCRIPTION',
                provider_token: process.env.STRIPE_API_TOKEN,
                currency: 'EUR',
                prices: JSON.stringify([
                    {
                        label: priceLabel,
                        amount,
                    },
                ]),
                start_parameter: startParameter,
            },
        });

        return response;
    } catch (err) {
        console.log(err);
    }
};

const sendTelegramCheckoutSuccess = async (preCheckoutQueryID) => {
    try {
        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerPreCheckoutQuery`;

        const response = await axios.get(url, {
            params: {
                pre_checkout_query_id: preCheckoutQueryID,
                ok: true,
            },
        });

        return response;
    } catch (err) {
        console.log(err);
    }
};

const sendTelegramCheckoutError = async (preCheckoutQueryID) => {
    try {
        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/answerPreCheckoutQuery`;

        const response = await axios.get(url, {
            params: {
                pre_checkout_query_id: preCheckoutQueryID,
                ok: false,
                error_message: 'There was an error with processing your transaction. Please try again later or contact support.',
            },
        });

        return response;
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    sendTelegramInvoice,
    sendTelegramCheckoutSuccess,
    sendTelegramCheckoutError,
};
