const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const CryptoInvoice = bookshelf.Model.extend({
    tableName: 'crypto_invoice',
    idAttribute: 'id',
    user () {
        const User = require('./User');
        return this.belongsTo(User);
    },
});

module.exports = bookshelf.model('CryptoInvoice', CryptoInvoice);
