const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const UserLockedSavingsNotification = bookshelf.Model.extend({
    tableName: 'user_locked_savings_notification',
    idAttribute: 'id',
    asset () {
        const AssetLockedSavings = require('./AssetLockedSavings');
        return this.belongsTo(AssetLockedSavings);
    },
    user () {
        const User = require('./User');
        return this.belongsTo(User);
    },
});

module.exports = bookshelf.model('UserLockedSavingsNotification', UserLockedSavingsNotification);
