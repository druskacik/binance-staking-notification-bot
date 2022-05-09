const axios = require('axios');

const getLaunchpadInfo = async () => {
    const url = 'https://launchpad.binance.com/bapi/lending/v1/public/lpd/project/projectList?page=1&pageSize=100';

    try {
        const response = await axios.get(url);
        return response.data.data.data; // srsly
    } catch (err) {
        console.log(err);
    }
};

module.exports = getLaunchpadInfo;
