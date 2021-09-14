const axios = require('axios');

const getLockedSavings = async () => {
    const url = 'https://www.binance.com/bapi/earn/v1/friendly/lending/project/customizedFixedProject/list?pageSize=99&pageIndex=1&status=ALL';

    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (err) {
        console.log(err);
    }
};

module.exports = getLockedSavings;
