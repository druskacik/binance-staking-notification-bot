const express = require('express');

const User = require('../models/User');
const Asset = require('../models/Asset');

const subscribeNewAssets = require('./telegram/subscribe');
const unsubscribeAssets = require('./telegram/unsubscribe');

const sendTelegramMessage = require('../services/telegram-bot');
const getUserSettings = require('./telegram/get-user.settings');

const router = express.Router();

router.route('/')
    .post(async (req, res) => {
        try {

            const message = req.body.message || req.body.edited_message;
            const chatID = message.chat.id;

            const messageText = message.text || '';

            const command = messageText.split(' ')[0];

            let assets;

            switch (command) {

                case '/start':
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
                    await sendTelegramMessage('start', chatID, {});
                    break;


                case '/list':
                    let availableAssets = await Asset.fetchAll();
                    availableAssets = availableAssets.toJSON();
                    availableAssets.sort((a, b) => {
                        if (a.asset_name < b.asset_name) { return -1; }
                        if (a.asset_name > b.asset_name) { return 1; }
                        return 0;
                    });
                    await sendTelegramMessage('list', chatID, {
                        assets: availableAssets,
                    });
                    break;

                
                case '/settings':

                    const userSettings = await getUserSettings(chatID);
                    const subscribedAssets = userSettings.assets.map(asset => asset.asset_name);
                    subscribedAssets.sort((a, b) => {
                        if (a < b) { return -1; }
                        if (a > b) { return 1; }
                        return 0;
                    });
                    await sendTelegramMessage('settings', chatID, {
                        subcribeNewAssets: userSettings.subscribe_new_assets,
                        assets: subscribedAssets,
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
                            subscribeNew: assets.includes('NEW'),
                            notFoundAssets: assets.filter(asset => !newSubscribedAssets.includes(asset) && asset !== 'NEW'),
                        });
                    } else {
                        await sendTelegramMessage('unknown command', chatID, {
                            message: 'Please enter at least one asset to subscribe !',
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
                        });
                    } else {
                        await sendTelegramMessage('unknown command', chatID, {
                            message: 'Please enter at least one asset to unsubscribe !',
                        });
                    }
                    break;


                default:
                    await sendTelegramMessage('unknown command', chatID, {});
            }

            res.status(200)
                .end('ok');

        } catch (err) {
            console.log(err);
            res.status(err.status || 500)
                .json({
                    status: err.status || 500,
                    message: err.message,
                })
            }
    })

module.exports = router;