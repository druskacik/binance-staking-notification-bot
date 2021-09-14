const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const Asset = bookshelf.Model.extend({
    tableName: 'asset',
    idAttribute: 'id',
    projects () {
        const Project = require('./Project');
        return this.hasMany(Project);
    },
    users () {
        const User = require('./User');
        const UserAssetNotification = require('./UserAssetNotification');
        return this.belongsToMany(User).through(UserAssetNotification);
    },
});

module.exports = bookshelf.model('Asset', Asset);
