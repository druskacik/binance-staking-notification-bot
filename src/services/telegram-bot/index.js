const axios = require('axios');
const Mustache = require('mustache')

const readFileAsync = require('../../utils/read-file-async');

const sendTelegramMessage = async (messageType, chatID, data) => {

    try {

        let text;
        let templateText;

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
                    assets: data.assets,
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
                    assets: data.assets,
                });
                break;

            case 'staking-project-available':
                templateText = await readFileAsync(__dirname + '/messages/project-available.mustache');
                text = Mustache.render(templateText, {
                    ...data.project,
                });
                break;

            case 'new-asset-available':
                templateText = await readFileAsync(__dirname + '/messages/new-asset.mustache');
                text = Mustache.render(templateText, {
                    ...data.asset,
                });
                break;

            default:
                templateText = await readFileAsync(__dirname + '/messages/help.mustache');
                text = Mustache.render(templateText, {
                    message: data.message || 'Unknown command !',
                });
        }

        const url = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=${chatID}&parse_mode=Markdown&text=${text}`;

        const response = await axios.get(url);

        return response;

    } catch (err) {
        console.log(err);
    }

}

module.exports = sendTelegramMessage;