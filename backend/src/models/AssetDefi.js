const connection = require('../../connection');
const bookshelf = require('bookshelf')(connection);

const AssetDefi = bookshelf.Model.extend({
    tableName: 'asset_defi',
    idAttribute: 'id',
    projects: function () {
        const ProjectDefi = require('./ProjectDefi');
        return this.hasMany(ProjectDefi);
    },
    users: function () {
        const User = require('./User');
        const UserDefiNotification = require('./UserDefiNotification');
        return this.belongsToMany(User).through(UserDefiNotification);
    }
});

module.exports = bookshelf.model('AssetDefi', AssetDefi);