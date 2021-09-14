const axios = require('axios');

const getDefiStakingInfo = async () => {
    const url = 'https://www.binance.com/bapi/earn/v1/friendly/defi-pos/union?pageSize=50&pageIndex=1&status=ALL';

    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (err) {
        console.log(err);
    }
};

module.exports = getDefiStakingInfo;
