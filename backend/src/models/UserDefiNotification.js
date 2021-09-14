const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const UserDefiNotification = bookshelf.Model.extend({
    tableName: 'user_defi_notification',
    idAttribute: 'id',
    asset () {
        const AssetDefi = require('./AssetDefi');
        return this.belongsTo(AssetDefi);
    },
    user () {
        const User = require('./User');
        return this.belongsTo(User);
    },
});

module.exports = bookshelf.model('UserDefiNotification', UserDefiNotification);
