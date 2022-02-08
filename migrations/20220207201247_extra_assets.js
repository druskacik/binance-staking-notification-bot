
exports.up = function (knex) {
    return Promise.all([
        knex.schema.alterTable('project', (table) => {
            table.string('extra_asset_name');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Columns extra_asset_name, created_at were added to table project.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.alterTable('project', (table) => {
            table.dropColumn('created_at');
            table.dropColumn('extra_asset_name');
        })
            .then(() => {
                console.log('Columns extra_asset_name, created_at were dropped from table project.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
