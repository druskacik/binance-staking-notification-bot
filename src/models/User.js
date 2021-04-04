const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const User = bookshelf.Model.extend({
    tableName: 'user',
    idAttribute: 'id',
    assets: function () {
        const Asset = require('./Asset');
        const UserAssetNotification = require('./UserAssetNotification');
        return this.belongsToMany(Asset).through(UserAssetNotification);
    }
});

module.exports = bookshelf.model('User', User);