const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const Project = bookshelf.Model.extend({
    tableName: 'project',
    idAttribute: 'id',
    asset () {
        const Asset = require('./Asset');
        return this.belongsTo(Asset);
    },
});

module.exports = bookshelf.model('Project', Project);
