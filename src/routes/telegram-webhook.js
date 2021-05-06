const express = require('express');

const User = require('../models/User');
const Asset = require('../models/Asset');
const AssetDefi = require('../models/AssetDefi');

const knex = require('../../connection');

const subscribeNewAssets = require('./telegram/subscribe');
const unsubscribeAssets = require('./telegram/unsubscribe');
const subscribeDefiAssets = require('./telegram/subscribe-defi');
const unsubscribeDefiAssets = require('./telegram/unsubscribe-defi');

const sendTelegramMessage = require('../services/telegram-bot');
const getUserSettings = require('./telegram/get-user-settings');

const router = express.Router();

router.route('/')
    .post(async (req, res) => {
        try {

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
            await addUserIfNotExists(chatID); // TODO: this is unnecessarily time consuming, refactor

            const messageText = message.text;
            if (!messageText) {
                res.status(200)
                    .end('ok');
                return;
            }

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

                    await sendTelegramMessage('list', chatID, {
                        assetsLocked,
                        assetsDefi,
                    });
                    break;

                
                case '/settings':

                    const userSettings = await getUserSettings(chatID);

                    const subscribedAssetsLocked = userSettings.assetsLocked.map(asset => asset.asset_name);
                    subscribedAssetsLocked.sort((a, b) => {
                        if (a < b) { return -1; }
                        if (a > b) { return 1; }
                        return 0;
                    });

                    const subscribedAssetsDefi = userSettings.assetsDefi.map(asset => asset.asset_name);
                    subscribedAssetsDefi.sort((a, b) => {
                        if (a < b) { return -1; }
                        if (a > b) { return 1; }
                        return 0;
                    });

                    await sendTelegramMessage('settings', chatID, {
                        subcribeNewAssetsLocked: userSettings.subscribe_new_assets,
                        subcribeNewAssetsDefi: userSettings.subscribe_defi,
                        subscribeActivities: userSettings.subscribe_activities,
                        assetsLocked: subscribedAssetsLocked,
                        assetsDefi: subscribedAssetsDefi
                    });
                    break;


                case '/help':
                    await sendTelegramMessage('help', chatID, {});
                    break;


                case '/subscribe':
                    assets = messageText.split(' ').slice(1);
                    if (assets.length > 0) {
                        assets = assets.map(a => a.toUpperCase());
                        const newSubscribedAssets = await subscribeNewAssets(chatID, assets);
                        await sendTelegramMessage('subscribe', chatID, {
                            assets: newSubscribedAssets,
                            subscribeNewLocked: assets.includes('NEW'),
                            notFoundAssets: assets.filter(asset => !newSubscribedAssets.includes(asset) && asset !== 'NEW'),
                        });
                    } else {
                        await sendTelegramMessage('unknown command', chatID, {
                            message: 'Please enter at least one currency to subscribe !',
                        });
                    }
                    break;


                case '/subscribe_defi':
                    assets = messageText.split(' ').slice(1);
                    if (assets.length > 0) {
                        assets = assets.map(a => a.toUpperCase());
                        const newSubscribedAssets = await subscribeDefiAssets(chatID, assets);
                        await sendTelegramMessage('subscribe', chatID, {
                            assets: newSubscribedAssets,
                            subscribeNewDefi: assets.includes('NEW'),
                            notFoundAssets: assets.filter(asset => !newSubscribedAssets.includes(asset) && asset !== 'NEW'),
                        });
                    } else {
                        await sendTelegramMessage('unknown command', chatID, {
                            message: 'Please enter at least one currency to subscribe !',
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
                        await sendTelegramMessage('unknown command', chatID, {
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
                        await sendTelegramMessage('unknown command', chatID, {
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
                    await sendTelegramMessage('subscribe-activities', chatID);
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


                default:
                    await sendTelegramMessage('unknown command', chatID, {});
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
                })
            }
    })

const addUserIfNotExists = async (chatID) => {
    try {
        let user = await User.forge().where({
            telegram_chat_id: chatID,
        }).fetchAll();
        user = user.toJSON();
        if (user.length === 0) {
            await new User({
                telegram_chat_id: chatID,
                active: 1,
                token: chatID,
            }).save();
            console.log('New Telegram user created !');
        }
    } catch(err) {
        throw err;
    }
}

module.exports = router;