const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const User = require('./User');
const UserAssetNotification = require('./UserAssetNotification');
const Project = require('./Project');

const Asset = bookshelf.Model.extend({
  tableName: 'asset',
  idAttribute: 'id',
  projects: function () { return this.hasMany(Project); },
  users: function () { return this.belongsToMany(User).through(UserAssetNotification) }
});

module.exports = bookshelf.model('Asset', Asset);