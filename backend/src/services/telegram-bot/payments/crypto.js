const axios = require('axios');

const User = require('../../../models/User');
const CryptoInvoice = require('../../../models/CryptoInvoice');
const axiosBtcpay = require('../../../axios-btcpay');
const sendTelegramMessage = require('../index');

const createAndSendCryptoInvoice = async (chatID, {
    subscriptionType,
    previousMessageID,
}) => {
    try {

        const user = await User.where({
            telegram_chat_id: chatID,
        }).fetch();
        const userJSON = user.toJSON();

        let amountFiat;
        let subscriptionDuration;

        switch (subscriptionType) {
            case '1YEAR_BTC':
                amountFiat = 15;
                subscriptionDuration = 365;
                break;

            default:
                amountFiat = 30;
                subscriptionDuration = 365;
        }

        const newInvoiceUrl = `${process.env.BTCPAY_URL}/api/v1/stores/${process.env.BTCPAY_STORE_ID}/invoices`;

        const invoiceData = {
            currency: 'EUR',
            amount: amountFiat,
        }

        const response = await axiosBtcpay.post(newInvoiceUrl, invoiceData);
        const invoice = response.data;

        const invoiceInfoUrl = `${process.env.BTCPAY_URL}/api/v1/stores/${process.env.BTCPAY_STORE_ID}/invoices/${invoice.id}/payment-methods`;
        const invoiceInfoResponse = await axiosBtcpay.get(invoiceInfoUrl);

        const destinationAddress = invoiceInfoResponse.data[0].destination;
        const paymentLink = invoiceInfoResponse.data[0].paymentLink;
        const amountDue = invoiceInfoResponse.data[0].amount;

        const newInvoice = await new CryptoInvoice({
            user_id: userJSON.id,
            telegram_chat_id: chatID,
            invoice_id: invoice.id,
            destination_address: destinationAddress,
            payment_link: paymentLink,
            amount_fiat: amountFiat,
            currency_fiat: 'EUR',
            amount: amountDue,
            currency: 'BTC',
            subscription_duration: subscriptionDuration,
        }).save();

        const urlToDeleteMessage = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/deleteMessage`;
        await axios.get(urlToDeleteMessage, {
            params: {
                chat_id: chatID,
                message_id: previousMessageID,
            },
        });

        const sentMessageResponse = await sendTelegramMessage('crypto-invoice', chatID, {
            destinationAddress,
            paymentLink,
            amountDue,
        });

        const sentMessage = sentMessageResponse.data;
        const messageID = sentMessage.result.message_id;

        await newInvoice.save({
            message_id: messageID,
        });

    } catch (err) {
        console.log(err);
    }
}

module.exports = createAndSendCryptoInvoice;