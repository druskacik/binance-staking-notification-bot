exports.up = function (knex) {
    return Promise.all([
        knex.schema.alterTable('user', (table) => {
            table.boolean('subscribe_launchpad').defaultTo(false);
        })
            .then(() => {
                console.log('Column subscribe_launchpad was added to table user.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('launchpad_project', (table) => {
            table.increments('id').primary();
            table.string('product_type').notNullable();
            table.string('asset').notNullable();
            table.string('binance_id').notNullable();
            table.integer('binance_product_id').notNullable();
            table.string('asset_type').notNullable();
            table.string('project_name').notNullable();
            table.text('project_description');
            table.string('project_url');
            table.string('logo_url');
            table.timestamp('purchase_start_timestamp');
            table.timestamp('purchase_end_timestamp');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table launchpad_project was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('launchpad_project')
            .then(() => {
                console.log('Table launchpad_project was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.alterTable('user', (table) => {
            table.dropColumn('subscribe_launchpad');
        })
            .then(() => {
                console.log('Column subscribe_launchpad was dropped from table user.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};