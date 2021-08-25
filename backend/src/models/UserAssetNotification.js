const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const UserAssetNotification = bookshelf.Model.extend({
    tableName: 'user_asset_notification',
    idAttribute: 'id',
    asset: function () {
        const Asset = require('./Asset');
        return this.belongsTo(Asset);
    },
    user: function () {
        const User = require('./User');
        return this.belongsTo(User);
    }
});

module.exports = bookshelf.model('UserAssetNotification', UserAssetNotification);