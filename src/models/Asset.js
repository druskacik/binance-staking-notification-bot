const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const Project = require('./Project');

const Asset = bookshelf.Model.extend({
  tableName: 'asset',
  idAttribute: 'id',
  projects: function () { return this.hasMany(Project); }
});

module.exports = bookshelf.model('Asset', Asset);