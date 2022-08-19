const express = require('express');
const dayjs = require('dayjs');

const User = require('../../../models/User');
const Asset = require('../../../models/Asset');
const AssetDefi = require('../../../models/AssetDefi');
const AssetLockedSavings = require('../../../models/AssetLockedSavings');

const knex = require('../../../../connection');

const sendTelegramMessage = require('../../../services/telegram-bot');
const telegramPaymentsHandler = require('../../../services/telegram-bot/payments');
const convertTimeToUTC = require('../../../utils/convert-time-to-utc');
const telegramTracker = require('../../../utils/telegram-tracker');

const subscribeNewAssets = require('./subscribe');
const unsubscribeAssets = require('./unsubscribe');
const subscribeDefiAssets = require('./subscribe-defi');
const unsubscribeDefiAssets = require('./unsubscribe-defi');
const subscribeLockedSavingsAssets = require('./subscribe-locked-savings');
const unsubscribeLockedSavingsAssets = require('./unsubscribe-locked-savings');
const handleTransaction = require('./handle-payments');
const getUserSettings = require('./get-user-settings');

const router = express.Router();

// TODO: refactor for god's sake
router.route('/')
    .post(async (req, res) => {
        try {
            // if pre_checkout_query is defined, there was an attempt for subscription payment
            if (req.body.pre_checkout_query) {
                const preCheckoutQueryID = req.body.pre_checkout_query.id;

                try {
                    await telegramPaymentsHandler.sendTelegramCheckoutSuccess(preCheckoutQueryID);

                    res.status(200)
                        .end('ok');
                    return;
                } catch (err) {
                    console.log(err);
                    await telegramPaymentsHandler.sendTelegramCheckoutError(preCheckoutQueryID);
                    res.status(200)
                        .end('ok');
                    return;
                }
            }

            // this means user pressed a button after /get_premium command
            if (req.body.callback_query) {
                const callbackQuery = req.body.callback_query;
                const chatID = callbackQuery.from.id;
                await telegramTracker.saveTelegramButtonClick(chatID, callbackQuery.data);

                const subscriptionType = callbackQuery.data;
                const isCryptoPayment = subscriptionType.endsWith('BTC');

                if (!isCryptoPayment) {
                    await telegramPaymentsHandler.sendTelegramInvoice(chatID, {
                        subscriptionType,
                        previousMessageID: callbackQuery.message.message_id,
                    });
                } else {
                    await telegramPaymentsHandler.createAndSendCryptoInvoice(chatID, {
                        subscriptionType,
                        previousMessageID: callbackQuery.message.message_id,
                    });
                }
                res.status(200)
                    .end('ok');
                return;
            }

            const message = req.body.message || req.body.edited_message;

            // if message is undefined, probably the bot was added to a group
            if (!message) {
                const myChatMember = req.body.my_chat_member;
                if (myChatMember) {
                    const chatID = myChatMember.chat.id;
                    await addUserIfNotExists(chatID);
                    await sendTelegramMessage('start', chatID, {});
                }
                res.status(200)
                    .end('ok');
                return;
            }

            const chatID = message.chat.id;
            const hasPremium = await addUserIfNotExists(chatID); // TODO: this is unnecessarily time consuming, refactor

            // this means user's payment was successful
            if (message.successful_payment) {
                await handleTransaction(message);
                // send message about successful payment
                let user = await User.where({
                    telegram_chat_id: chatID,
                }).fetch();
                user = user.toJSON();
                const subscriptionEndDate = convertTimeToUTC(user.subscription_end_date);
                await sendTelegramMessage('successful-payment', chatID, {
                    subscriptionEndDate,
                });
                res.status(200)
                    .end('ok');
                return;
            }

            const messageText = message.text;
            if (!messageText) {
                res.status(200)
                    .end('ok');
                return;
            }

            await telegramTracker.saveTelegramMessage(chatID, messageText);

            let command = messageText.split(' ')[0];
            if (command.includes('@')) {
                command = command.split('@')[0];
            }

            let assets;

            switch (command) {
            case '/start':
                await sendTelegramMessage('start', chatID, {});
                break;

            case '/list':

                let assetsLocked = await Asset.fetchAll();
                assetsLocked = assetsLocked.toJSON();
                assetsLocked.sort((a, b) => {
                    if (a.asset_name < b.asset_name) { return -1; }
                    if (a.asset_name > b.asset_name) { return 1; }
                    return 0;
                });

                let assetsDefi = await AssetDefi.fetchAll();
                assetsDefi = assetsDefi.toJSON();
                assetsDefi.sort((a, b) => {
                    if (a.asset_name < b.asset_name) { return -1; }
                    if (a.asset_name > b.asset_name) { return 1; }
                    return 0;
                });

                let assetsLockedSavings = await AssetLockedSavings.fetchAll();
                assetsLockedSavings = assetsLockedSavings.toJSON();
                assetsLockedSavings.sort((a, b) => {
                    if (a.asset_name < b.asset_name) { return -1; }
                    if (a.asset_name > b.asset_name) { return 1; }
                    return 0;
                });

                await sendTelegramMessage('list', chatID, {
                    assetsLocked,
                    assetsDefi,
                    assetsLockedSavings,
                });
                break;

            case '/settings':

                const userSettings = await getUserSettings(chatID);
                await sendTelegramMessage('settings', chatID, userSettings);
                break;

            case '/help':
                await sendTelegramMessage('help', chatID, {});
                break;

            case '/subscribe':
                assets = messageText.trim().split(/\s+/).slice(1);
                if (assets.length > 0) {
                    assets = assets.map(a => a.toUpperCase());
                    const newSubscribedAssets = await subscribeNewAssets(chatID, assets);
                    await sendTelegramMessage('subscribe', chatID, {
                        assets: newSubscribedAssets,
                        subscribeNewLocked: assets.includes('NEW'),
                        notFoundAssets: assets.filter(asset => !newSubscribedAssets.includes(asset) && asset !== 'NEW'),
                        stakingType: 'locked staking',
                        hasPremium,
                    });
                } else {
                    await sendTelegramMessage('subscribe-howto', chatID, {
                        locked: true,
                    });
                }
                break;

            case '/subscribe_defi':
                assets = messageText.trim().split(/\s+/).slice(1);
                if (assets.length > 0) {
                    assets = assets.map(a => a.toUpperCase());
                    const newSubscribedAssets = await subscribeDefiAssets(chatID, assets);
                    await sendTelegramMessage('subscribe', chatID, {
                        assets: newSubscribedAssets,
                        subscribeNewDefi: assets.includes('NEW'),
                        notFoundAssets: assets.filter(asset => !newSubscribedAssets.includes(asset) && asset !== 'NEW'),
                        stakingType: 'DeFi staking',
                        hasPremium,
                    });
                } else {
                    await sendTelegramMessage('subscribe-howto', chatID, {
                        defi: true,
                    });
                }
                break;

            case '/subscribe_locked_savings':
                assets = messageText.trim().split(/\s+/).slice(1);
                if (assets.length > 0) {
                    assets = assets.map(a => a.toUpperCase());
                    const newSubscribedAssets = await subscribeLockedSavingsAssets(chatID, assets);
                    await sendTelegramMessage('subscribe', chatID, {
                        assets: newSubscribedAssets,
                        subscribeNewLockedSavings: assets.includes('NEW'),
                        notFoundAssets: assets.filter(asset => !newSubscribedAssets.includes(asset) && asset !== 'NEW'),
                        stakingType: 'Locked Savings',
                        hasPremium,
                    });
                } else {
                    await sendTelegramMessage('subscribe-howto', chatID, {
                        lockedSavings: true,
                    });
                }
                break;

            case '/unsubscribe':
                assets = messageText.split(' ').slice(1);
                if (assets.length > 0) {
                    assets = assets.map(a => a.toUpperCase());
                    const unsubscribedAssets = await unsubscribeAssets(chatID, assets);
                    await sendTelegramMessage('unsubscribe', chatID, {
                        assets: unsubscribedAssets,
                        unsubscribeNewLocked: assets.includes('NEW'),
                    });
                } else {
                    await sendTelegramMessage('custom-message', chatID, {
                        message: 'Please enter at least one currency to unsubscribe !',
                    });
                }
                break;

            case '/unsubscribe_defi':
                assets = messageText.split(' ').slice(1);
                if (assets.length > 0) {
                    assets = assets.map(a => a.toUpperCase());
                    const unsubscribedAssets = await unsubscribeDefiAssets(chatID, assets);
                    await sendTelegramMessage('unsubscribe', chatID, {
                        assets: unsubscribedAssets,
                        unsubscribeNewDefi: assets.includes('NEW'),
                    });
                } else {
                    await sendTelegramMessage('custom-message', chatID, {
                        message: 'Please enter at least one currency to unsubscribe !',
                    });
                }
                break;

            case '/unsubscribe_locked_savings':
                assets = messageText.split(' ').slice(1);
                if (assets.length > 0) {
                    assets = assets.map(a => a.toUpperCase());
                    const unsubscribedAssets = await unsubscribeLockedSavingsAssets(chatID, assets);
                    await sendTelegramMessage('unsubscribe', chatID, {
                        assets: unsubscribedAssets,
                        unsubscribeNewLockedSavings: assets.includes('NEW'),
                    });
                } else {
                    await sendTelegramMessage('custom-message', chatID, {
                        message: 'Please enter at least one currency to unsubscribe !',
                    });
                }
                break;

            case '/subscribe_activities':
                await knex('user')
                    .where({
                        telegram_chat_id: chatID,
                    })
                    .update({
                        subscribe_activities: 1,
                    });
                await sendTelegramMessage('subscribe-activities', chatID, {
                    hasPremium,
                });
                break;

            case '/unsubscribe_activities':
                await knex('user')
                    .where({
                        telegram_chat_id: chatID,
                    })
                    .update({
                        subscribe_activities: 0,
                    });
                await sendTelegramMessage('unsubscribe-activities', chatID);

                break;

            case '/subscribe_launchpad':
                await knex('user')
                    .where({
                        telegram_chat_id: chatID,
                    })
                    .update({
                        subscribe_launchpad: 1,
                    });
                await sendTelegramMessage('subscribe-launchpad', chatID, {
                    hasPremium,
                });
                break;

            case '/unsubscribe_launchpad':
                await knex('user')
                    .where({
                        telegram_chat_id: chatID,
                    })
                    .update({
                        subscribe_launchpad: 0,
                    });
                await sendTelegramMessage('unsubscribe-launchpad', chatID, {
                    hasPremium,
                });
                break;

            case '/get_premium':
                let user = await User.where({
                    telegram_chat_id: chatID,
                }).fetch();
                user = user.toJSON();
                const subscriptionEndDate = convertTimeToUTC(user.subscription_end_date);
                await sendTelegramMessage('get-premium', chatID, {
                    hasPremium: user.is_pro,
                    subscriptionEndDate,
                });
                break;

            case '/support':
                await sendTelegramMessage('support', chatID);
                break;

            case '/terms':
                await sendTelegramMessage('terms', chatID);
                break;

            case '/faq':
                await sendTelegramMessage('faq', chatID);
                break;

            case '/status':
                await sendTelegramMessage('status', chatID);
                break;

            default:
                await sendTelegramMessage('unknown-command', chatID, {});
            }

            res.status(200)
                .end('ok');
        } catch (err) {
            console.log(req.body);
            console.log(err);
            res.status(err.status || 500)
                .json({
                    status: err.status || 500,
                    message: err.message,
                });
        }
    });

// TODO: refactor, use fetch instead of fetchAll
const addUserIfNotExists = async (chatID) => {
    try {
        let user = await User.forge().where({
            telegram_chat_id: chatID,
        }).fetchAll();
        user = user.toJSON();

        if (user.length === 0) {
            const currentTimestamp = dayjs();
            // free trial for 7 days
            const duration = 7;
            const subscriptionEndTime = currentTimestamp.add(duration, 'day');
            const subscriptionEndDate = subscriptionEndTime.format('YYYY-MM-DD HH:mm:ss');

            await new User({
                telegram_chat_id: chatID,
                active: 1,
                token: chatID,
                is_pro: 1,
                subscription_end_date: subscriptionEndDate,
            }).save();
            console.log('New Telegram user created !');
            return true;
        }

        return user[0].is_pro;
    } catch (err) {
        throw err;
    }
};

module.exports = router;
