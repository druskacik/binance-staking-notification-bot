const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const UserDefiNotification = bookshelf.Model.extend({
    tableName: 'user_defi_notification',
    idAttribute: 'id',
    asset: function () {
        const AssetDefi = require('./AssetDefi');
        return this.belongsTo(AssetDefi);
    },
    user: function () {
        const User = require('./User');
        return this.belongsTo(User);
    }
});

module.exports = bookshelf.model('UserDefiNotification', UserDefiNotification);