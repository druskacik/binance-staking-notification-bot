const dayjs = require('dayjs');

const knex = require('../../../connection');

const User = require('../../models/User');

const handleTransaction = async (telegramUpdate) => {
    
    const chatID = telegramUpdate.pre_checkout_query.from.id;
    const currency = telegramUpdate.pre_checkout_query.currency;
    const price = telegramUpdate.pre_checkout_query.total_amount;

    let duration;
    switch (price) {
        case 200:
            duration = 7;
            break;
        case 500:
            duration = 28;
            break;
        case 3000:
            duration = 365;
            break;
        default:
            duration = 7;
    }


    const currentTimestamp = dayjs();

    let user = await User.where({
        telegram_chat_id: chatID,
    }).fetch();

    const userJSON = user.toJSON();
    const currentSubscriptionEndDate = userJSON.subscription_end_date;
    const diff = currentTimestamp.diff(currentSubscriptionEndDate);

    // if subscription haven't yet exspired, add days to existing exspiration date
    const baseTime = diff > 0 ? currentTimestamp : dayjs(currentSubscriptionEndDate);
    const subscriptionEndTime = baseTime.add(duration, 'day');
    const subscriptionEndDate = subscriptionEndTime.format('YYYY-MM-DD HH:mm:ss');


    await user.save({
        is_pro: true,
        subscription_end_date: subscriptionEndDate,
    }, { method: 'update', patch: true, })

    await knex('transaction').insert({
        user_id: userJSON.id,
        telegram_chat_id: chatID,
        price_paid: price,
        currency: currency,
        duration: duration,
    })

}

module.exports = handleTransaction;