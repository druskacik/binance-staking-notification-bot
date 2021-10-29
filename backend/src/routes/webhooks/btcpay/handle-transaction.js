const dayjs = require('dayjs');

const knex = require('../../../../connection');
const CryptoInvoice = require('../../../models/CryptoInvoice');

const User = require('../../../models/User');

const editTelegramMessage = require('../../../services/telegram-bot/edit-message');

const upgradeUserToPremium = async (invoiceID) => {

    const invoice = await CryptoInvoice
        .where({
            invoice_id: invoiceID,
        })
        .fetch();
    const invoiceJSON = invoice.toJSON();
    const subscriptionDuration = invoiceJSON.subscription_duration

    const user = await User.where({
        id: invoiceJSON.user_id,
    }).fetch();
    const userJSON = user.toJSON();

    let currentTimestamp = dayjs();
    const currentSubscriptionEndDate = userJSON.subscription_end_date;
    const diff = currentTimestamp.diff(currentSubscriptionEndDate);

    // if subscription haven't yet exspired, add days to existing exspiration date
    const baseTime = diff > 0 ? currentTimestamp : dayjs(currentSubscriptionEndDate);
    const subscriptionEndTime = baseTime.add(subscriptionDuration, 'day');
    const subscriptionEndDate = subscriptionEndTime.format('YYYY-MM-DD HH:mm:ss');
    currentTimestamp = currentTimestamp.format('YYYY-MM-DD HH:mm:ss');

    await user.save({
        is_pro: true,
        subscription_end_date: subscriptionEndDate,
    }, { method: 'update', patch: true });

    await invoice.save({
        paid: true,
        received_payment_at: currentTimestamp,
    }, { method: 'update', patch: true });

    return user.toJSON();
};

const settleTransaction = async (invoiceID) => {

    let currentTimestamp = dayjs();
    currentTimestamp = currentTimestamp.format('YYYY-MM-DD HH:mm:ss');

    await knex('crypto_invoice')
        .where({
            invoice_id: invoiceID,
        })
        .update({
            settled: true,
            settled_at: currentTimestamp,
        });
}

const expireTransaction = async (invoiceID) => {

    const invoice = await CryptoInvoice
        .where({
            invoice_id: invoiceID,
        })
        .fetch();
    const invoiceJSON = invoice.toJSON();

    // if invoice was not paid, edit the messsage with invice information to prevent future payments
    // if the invoice was paid, let it be
    // column "expired" is checked because in case of a partial payment, multiple webhooks are sent for the same invoice
    if (!invoiceJSON.paid && !invoiceJSON.expired) {
        const chatID = invoiceJSON.telegram_chat_id;
        const messageID = invoiceJSON.message_id;
    
        // TODO: messages sent after a partial payment should probably also be edited
        await editTelegramMessage('crypto-invoice-expired', chatID, messageID);
    
        await invoice.save({
            expired: true,
        }, { method: 'update', patch: true });
    }

}

module.exports = {
    upgradeUserToPremium,
    settleTransaction,
    expireTransaction,
};
