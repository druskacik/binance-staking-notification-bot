
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('asset_defi', (table) => {
            table.increments('id').primary();
            table.string('asset_name').notNullable();
        })
            .then(() => {
                console.log('Table asset_defi was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('project_defi', (table) => {
            table.increments('id').primary();
            table.integer('binance_id');
            table.string('asset_name').notNullable();
            table.string('product_name');

            table.boolean('active');

            table.integer('asset_id').unsigned();
            table.foreign('asset_id').references('asset_defi.id');

            table.boolean('duration_flexible').defaultTo(0);
            table.integer('duration');

            table.boolean('sold_out');

            table.float('interest_rate', 38, 16);
            table.float('daily_interest_rate', 38, 16);

            table.float('min_purchase_amount', 38, 4);
            table.float('max_purchase_amount', 38, 4);
            table.float('left_available', 38, 4);
        })
            .then(() => {
                console.log('Table project_defi was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('user_defi_notification', (table) => {
            table.increments('id').primary();

            table.integer('user_id').unsigned();
            table.foreign('user_id').references('user.id');
            table.integer('asset_defi_id').unsigned();
            table.foreign('asset_defi_id').references('asset_defi.id');

            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table user_defi_notification was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.alterTable('user', (table) => {
            table.boolean('subscribe_defi').defaultTo(0);
        })
            .then(() => {
                console.log('Column subscribe_defi was added to table user.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.alterTable('user', (table) => {
            table.dropColumn('subscribe_defi');
        })
            .then(() => {
                console.log('Column subscribe_defi was dropped from table user.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('user_defi_notification')
            .then(() => {
                console.log('Table user_defi_notification was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('project_defi')
            .then(() => {
                console.log('Table project_defi was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('asset_defi')
            .then(() => {
                console.log('Table asset_defi was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
