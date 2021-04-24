const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const ProjectDefi = bookshelf.Model.extend({
    tableName: 'project_defi',
    idAttribute: 'id',
    asset: function () {
        const AssetDefi = require('./AssetDefi');
        return this.belongsTo(AssetDefi);
    }
});

module.exports = bookshelf.model('ProjectDefi', ProjectDefi);