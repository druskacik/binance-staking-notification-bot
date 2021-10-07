const axios = require('axios');

const knex = require('../../connection');

const getLockedSavings = async () => {
    const url = 'https://www.binance.com/bapi/earn/v1/friendly/lending/project/customizedFixedProject/list?pageSize=99&pageIndex=1&status=ALL';

    try {
        const response = await axios.get(url);

        // log responses for future analysis
        // TODO: maybe another solution like separate mongo database for logs?
        try {
            await knex('api_response_log').insert({
                request_type: 'GET_LOCKED_SAVINGS',
                status: response.status,
                response_json: JSON.stringify(response.data),
            });
        } catch (err) {
            console.log(err);
        }

        return response.data.data;
    } catch (err) {
        console.log(err);
    }
};

module.exports = getLockedSavings;
