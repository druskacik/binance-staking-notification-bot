const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const Asset = require('./Asset');
const User = require('./User');

const UserAssetNotification = bookshelf.Model.extend({
  tableName: 'user_asset_notification',
  idAttribute: 'id',
  asset: function () { return this.belongsTo(Asset); },
  user: function () { return this.belongsTo(User); }
});

module.exports = bookshelf.model('UserAssetNotification', UserAssetNotification);