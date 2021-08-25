const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const User = bookshelf.Model.extend({
    tableName: 'user',
    idAttribute: 'id',
    assetsLocked: function () {
        const Asset = require('./Asset');
        const UserAssetNotification = require('./UserAssetNotification');
        return this.belongsToMany(Asset).through(UserAssetNotification);
    },
    assetsDefi: function () {
        const AssetDefi = require('./AssetDefi');
        const UserDefiNotification = require('./UserDefiNotification');
        return this.belongsToMany(AssetDefi).through(UserDefiNotification);
    },
    assetsLockedSavings: function () {
        const AssetLockedSavings = require('./AssetLockedSavings');
        const UserLockedSavingsNotification = require('./UserLockedSavingsNotification');
        return this.belongsToMany(AssetLockedSavings).through(UserLockedSavingsNotification);
    }
});

module.exports = bookshelf.model('User', User);