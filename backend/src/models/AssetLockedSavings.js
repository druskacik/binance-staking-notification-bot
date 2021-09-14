const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const AssetLockedSavings = bookshelf.Model.extend({
    tableName: 'asset_locked_savings',
    idAttribute: 'id',
    projects () {
        const ProjectLockedSavings = require('./ProjectLockedSavings');
        return this.hasMany(ProjectLockedSavings);
    },
    users () {
        const User = require('./User');
        const UserLockedSavingsNotification = require('./UserLockedSavingsNotification');
        return this.belongsToMany(User).through(UserLockedSavingsNotification);
    },
});

module.exports = bookshelf.model('AssetLockedSavings', AssetLockedSavings);
