const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const Email = require('./Email');
const EmailAssetNotification = require('./EmailAssetNotification');
const Project = require('./Project');

const Asset = bookshelf.Model.extend({
  tableName: 'asset',
  idAttribute: 'id',
  projects: function () { return this.hasMany(Project); },
  emails: function () { return this.belongsToMany(Email).through(EmailAssetNotification) }
});

module.exports = bookshelf.model('Asset', Asset);