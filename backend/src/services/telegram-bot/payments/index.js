const fiatPaymentsHandler = require('./fiat');
const createAndSendCryptoInvoice = require('./crypto');

module.exports = {
    ...fiatPaymentsHandler,
    createAndSendCryptoInvoice,
}