const express = require('express');

const CryptoInvoice = require('../../../models/CryptoInvoice');
const axiosBtcpay = require('../../../axios-btcpay');
const transactionHandler = require('./handle-transaction');
const sendTelegramMessage = require('../../../services/telegram-bot');
const sendAdminNotification = require('../../../admin-notifications');
const convertTimeToUTC = require('../../../utils/convert-time-to-utc');

const router = express.Router();

router.route('/')
    .post(async (req, res) => {
        try {

            // TODO (IMPORTANT): check signature

            const eventType = req.body.type;
            const invoiceID = req.body.invoiceId;

            switch (eventType) {
                case 'InvoiceReceivedPayment':

                    const invoicePaymentsUrl = `${process.env.BTCPAY_URL}/api/v1/stores/${process.env.BTCPAY_STORE_ID}/invoices/${invoiceID}/payment-methods`;
                    const invoicePaymentsResponse = await axiosBtcpay.get(invoicePaymentsUrl);

                    const paymentsInfo = invoicePaymentsResponse.data[0];

                    // "due" is string type
                    const dueToPay = parseFloat(paymentsInfo.due);

                    if (dueToPay === 0) {
                        const user = await transactionHandler.upgradeUserToPremium(invoiceID);
                        const subscriptionEndDate = convertTimeToUTC(user.subscription_end_date);
                        await sendTelegramMessage('crypto-payment-success', user.telegram_chat_id, {
                            subscriptionEndDate,
                        });
                    } else {
                        const payments = paymentsInfo.payments;
                        const lastPayment = payments[payments.length - 1];
                        const user = await getUserByInvoiceID(invoiceID);
                        await sendTelegramMessage('crypto-payment-partial', user.telegram_chat_id, {
                            amountPaid: lastPayment.value,
                            amountDue: dueToPay,
                            destinationAddress: lastPayment.destination,
                        });
                    }
                    break;

                case 'InvoiceSettled':
                    await transactionHandler.settleTransaction(invoiceID);
                    // send notification to telegram chat with admin
                    await sendAdminNotification('crypto-payment-settled', {
                        invoiceID,
                    });
 
                case 'InvoiceExpired':
                    // expire transaction and edit message with invoice
                    await transactionHandler.expireTransaction(invoiceID);
            }

            res.status(200)
                .end('ok');
        } catch (err) {
            console.log(err);
            res.status(err.status || 500)
                .json({
                    status: err.status || 500,
                    message: err.message,
                });
        }
    });

const getUserByInvoiceID = async (invoiceID) => {
    const invoice = await CryptoInvoice
        .where({
            invoice_id: invoiceID,
        })
        .fetch({
            withRelated: 'user',
        });
    return invoice.toJSON().user;
}

module.exports = router;
