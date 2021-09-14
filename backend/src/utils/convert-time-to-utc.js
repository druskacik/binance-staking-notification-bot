const dayjs = require('dayjs');

const convertTimeToUTC = (ts) => {
    let utcTime = new Date(ts);
    utcTime = utcTime.toISOString();
    utcTime = dayjs(utcTime).format('MMM DD YYYY HH:mm:ss');
    return utcTime;
};

module.exports = convertTimeToUTC;
