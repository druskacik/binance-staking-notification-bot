const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const Asset = require('./Asset');
const Email = require('./Email');

const EmailAssetNotification = bookshelf.Model.extend({
  tableName: 'email_asset_notification',
  idAttribute: 'id',
  asset: function () { return this.belongsTo(Asset); },
  email: function () { return this.belongsTo(Email); }
});

module.exports = bookshelf.model('EmailAssetNotification', EmailAssetNotification);