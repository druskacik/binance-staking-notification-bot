const axios = require('axios');

const getStakingInfo = async () => {
    const url = 'https://www.binance.com/gateway-api/v1/friendly/pos/union?status=ALL&pageSize=100';

    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (err) {
        console.log(err);
    }
};

module.exports = getStakingInfo;
