const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const Email = bookshelf.Model.extend({
  tableName: 'email',
  idAttribute: 'id',
});

module.exports = bookshelf.model('Email', Email);