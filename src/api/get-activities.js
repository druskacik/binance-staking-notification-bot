const axios = require('axios');

const getActivitiesInfo = async () => {

    const url = 'https://www.binance.com/bapi/earn/v1/friendly/lending/project/list?pageSize=100&pageIndex=1&status=ALL';

    try {

        const response = await axios.get(url);
        return response.data.data;

    } catch (err) {
        console.log(err);
    }
}

module.exports = getActivitiesInfo;
