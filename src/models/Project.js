const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const Asset = require('./Asset');

const Project = bookshelf.Model.extend({
  tableName: 'project',
  idAttribute: 'id',
  asset: function () { return this.belongsTo(Asset); }
});

module.exports = bookshelf.model('Project', Project);