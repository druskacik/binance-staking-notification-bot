const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const Asset = require('./Asset');
const UserAssetNotification = require('./UserAssetNotification');

const User = bookshelf.Model.extend({
  tableName: 'user',
  idAttribute: 'id',
  assets: function () { return this.belongsToMany(Asset).through(UserAssetNotification) }
});

module.exports = bookshelf.model('User', User);