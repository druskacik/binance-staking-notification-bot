const axios = require('axios');
const Mustache = require('mustache');

const readFileAsync = require('../../utils/read-file-async');

const sendTelegramMessage = async (messageType, chatID, data) => {
    try {
        let text;
        let templateText;
        const parseMode = 'HTML';
        let replyMarkup;

        switch (messageType) {
        case 'start':
            templateText = await readFileAsync(__dirname + '/messages/start.mustache');
            text = Mustache.render(templateText);
            break;
        case 'help':
            templateText = await readFileAsync(__dirname + '/messages/help.mustache');
            text = Mustache.render(templateText, {
                message: 'Binance Staking Bot Help',
            });
            break;

        case 'list':
            templateText = await readFileAsync(__dirname + '/messages/list.mustache');
            text = Mustache.render(templateText, {
                assetsLocked: data.assetsLocked,
                assetsDefi: data.assetsDefi,
                assetsLockedSavings: data.assetsLockedSavings,
            });
            break;

        case 'settings':
            templateText = await readFileAsync(__dirname + '/messages/settings.mustache');
            text = Mustache.render(templateText, {
                ...data,
            });
            break;

        case 'subscribe':
            templateText = await readFileAsync(__dirname + '/messages/subscribe.mustache');
            text = Mustache.render(templateText, {
                ...data,
                found: data.assets.length > 0,
                notFound: data.notFoundAssets.length > 0,
            });
            break;

        case 'unsubscribe':
            templateText = await readFileAsync(__dirname + '/messages/unsubscribe.mustache');
            text = Mustache.render(templateText, {
                ...data,
                unsubscribedSomething: data.assets.length > 0,
            });
            break;

        case 'staking-project-available':
            templateText = await readFileAsync(__dirname + '/messages/project-available.mustache');
            text = Mustache.render(templateText, {
                asset: data.projects[0].asset,
                projects: data.projects,
            });
            break;

        case 'defi-project-available':
            templateText = await readFileAsync(__dirname + '/messages/defi-project-available.mustache');
            text = Mustache.render(templateText, {
                asset: data.projects[0].asset,
                projects: data.projects,
            });
            break;

        case 'locked-savings-project-available':
            templateText = await readFileAsync(__dirname + '/messages/locked-savings-project-available.mustache');
            text = Mustache.render(templateText, {
                asset: data.projects[0].asset,
                projects: data.projects,
            });
            break;

        case 'new-asset-available':
            templateText = await readFileAsync(__dirname + '/messages/new-asset.mustache');
            text = Mustache.render(templateText, {
                ...data.asset,
            });
            break;

        case 'new-defi-asset-available':
            templateText = await readFileAsync(__dirname + '/messages/new-defi-asset.mustache');
            text = Mustache.render(templateText, {
                ...data.asset,
            });
            break;

        case 'new-locked-savings-asset-available':
            templateText = await readFileAsync(__dirname + '/messages/new-locked-savings-asset-available.mustache');
            text = Mustache.render(templateText, {
                ...data.asset,
            });
            break;

        case 'new-activity-available':
            templateText = await readFileAsync(__dirname + '/messages/new-activity.mustache');
            text = Mustache.render(templateText, {
                ...data.item,
            });
            break;

        case 'subscribe-activities':
            templateText = await readFileAsync(__dirname + '/messages/subscribe-activities.mustache');
            text = Mustache.render(templateText, {
                hasPremium: data.hasPremium,
            });
            break;

        case 'unsubscribe-activities':
            templateText = await readFileAsync(__dirname + '/messages/unsubscribe-activities.mustache');
            text = Mustache.render(templateText);
            break;

        case 'get-premium':
            templateText = await readFileAsync(__dirname + '/messages/get-premium.mustache');
            text = Mustache.render(templateText, {
                ...data,
            });
            replyMarkup = {
                inline_keyboard: [
                    [{
                        text: 'SUBSCRIPTION 1 WEEK (2€)',
                        callback_data: '1WEEK',
                    }],
                    [{
                        text: 'SUBSCRIPTION 4 WEEKS (5€)',
                        callback_data: '4WEEK',
                    }],
                    [{
                        text: 'SUBSCRIPTION 1 YEAR (30€)',
                        callback_data: '1YEAR',
                    }],
                ],
            };
            break;

        case 'successful-payment':
            templateText = await readFileAsync(__dirname + '/messages/successful-payment.mustache');
            text = Mustache.render(templateText, {
                subscriptionEndDate: data.subscriptionEndDate,
            });
            break;

        case 'subscription-ended':
            templateText = await readFileAsync(__dirname + '/messages/subscription-ended.mustache');
            text = Mustache.render(templateText);
            break;

        case 'support':
            templateText = await readFileAsync(__dirname + '/messages/support.mustache');
            text = Mustache.render(templateText);
            break;

        case 'terms':
            templateText = await readFileAsync(__dirname + '/messages/terms-and-conditions.mustache');
            text = Mustache.render(templateText);
            break;

        case 'custom-message':
            text = data.message;
            break;

        default:
            templateText = await readFileAsync(__dirname + '/messages/help.mustache');
            text = Mustache.render(templateText, {
                message: data.message || 'Unknown command !',
            });
        }

        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`;

        const response = await axios.get(url, {
            params: {
                chat_id: chatID,
                parse_mode: parseMode,
                text,
                disable_web_page_preview: 1,
                reply_markup: replyMarkup,
            },
        });

        return response;
    } catch (err) {
        console.log(err);
    }
};

module.exports = sendTelegramMessage;
