const axios = require('axios');

const knex = require('../../connection');

const sendNewLaunchpadProjectNotifications = require('../notifications/launchpad');
const convertTimeToUTC = require('../utils/convert-time-to-utc');

const updateLaunchpad = async (data) => {
    try {
        const response = await Promise.all(data.map(async (item) => {
            const itemDB = await knex('launchpad_project')
                .where({
                    binance_id: item.id,
                    binance_product_id: item.productId,
                })
                .first();

            if (!itemDB) {
                // new activity !
                console.log('New launchpad project !', item.projectName);

                const logo = await getProjectPicture(item.productPic);
                const projectUrl = getProjectUrl(item);

                await knex('launchpad_project')
                    .insert({
                        product_type: item.productType,
                        asset: item.productCode,
                        binance_id: item.id,
                        binance_product_id: item.productId,
                        asset_type: item.assetType,
                        project_name: item.projectName,
                        project_description: item.projectDesc,
                        project_url: projectUrl,
                        logo_url: item.productPic,
                        purchase_start_timestamp: convertTimestamp(item.purchaseStartTimestamp),
                        purchase_end_timestamp: convertTimestamp(item.purchaseEndTimestamp),
                    });

                await sendNewLaunchpadProjectNotifications({
                    ...item,
                    startTime: convertTimeToUTC(convertTimestamp(item.purchaseStartTimestamp)),
                    endTime: item.purchaseEndTimestamp && convertTimeToUTC(convertTimestamp(item.purchaseEndTimestamp)),
                    projectUrl,
                }, logo);
            }
        }));
    } catch (err) {
        console.log(err);
    }
};

const convertTimestamp = (timestampInMs) => {
    return timestampInMs && new Date(Number(timestampInMs));
}

const getProjectPicture = async (logoUrl) => {
    try {

        const response = await axios.get(logoUrl, {
            headers: {
                'Referer': 'https://launchpad.binance.com/',
            },
            responseType: 'arraybuffer',
        });

        return response.data;
        
    } catch (err) {
        console.log(err);
        return null;
    }
}

// manual way to parse url from the data
// TODO: this may not always work, it would probaly be better to parse html website every time a new project appears
const getProjectUrl = (item) => {
    switch(item.productType) {
        case 'INVEST':
            return `https://launchpad.binance.com/en/subscription/${item.id}`;
        case 'LOTTERY':
            return `https://launchpad.binance.com/en/lottery/${item.id}`;
        case 'PURCHASE':
            return `https://launchpad.binance.com/en/purchase/${item.id}`;
        default:
            return null;
    }
}

module.exports = updateLaunchpad;
