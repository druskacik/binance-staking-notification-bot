const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const ProjectLockedSavings = bookshelf.Model.extend({
    tableName: 'project_locked_savings',
    idAttribute: 'id',
    asset: function () {
        const AssetLockedSavings = require('./AssetLockedSavings');
        return this.belongsTo(AssetLockedSavings);
    }
});

module.exports = bookshelf.model('ProjectLockedSavings', ProjectLockedSavings);