
exports.up = function(knex) {

    return Promise.all([
        knex.schema.createTable('asset', (table) => {
            table.increments('id').primary();
            table.string('asset_name').notNullable();
        })
            .then(() => {
                console.log('Table asset was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('project', (table) => {
            table.increments('id').primary();
            table.integer('binance_id');
            table.string('asset_name').notNullable();

            table.boolean('active');

            table.integer('asset_id').unsigned();
            table.foreign('asset_id').references('asset.id');

            table.integer('duration');

            table.boolean('sold_out');

            table.float('interest_rate', 38, 16);
            table.float('daily_interest_rate', 38, 16);

            table.float('min_purchase_amount', 38, 4);
            table.float('max_purchase_amount', 38, 4);

        })
            .then(() => {
                console.log('Table project was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('email', (table) => {
            table.increments('id').primary();
            table.string('address').notNullable();
            table.boolean('subscribe_new_assets').defaultTo(0);
            table.boolean('active').defaultTo(0);
            table.string('token').notNullable();
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table email was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('email_asset_notification', (table) => {
            table.increments('id').primary();

            table.integer('email_id').unsigned();
            table.foreign('email_id').references('email.id');
            table.integer('asset_id').unsigned();
            table.foreign('asset_id').references('asset.id');

            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table email_asset_notification was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('subscription_request', (table) => {
            table.increments('id').primary();
            table.string('request_json', 10000);
            table.string('token').notNullable();
            table.integer('active').defaultTo(1);
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table subscription_request was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ])
  
};

exports.down = function(knex) {
  return Promise.all([
        knex.schema.dropTable('subscription_request')
            .then(() => {
                console.log('Table subscription_request was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('email_asset_notification')
            .then(() => {
                console.log('Table email_asset_notification was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('email')
            .then(() => {
                console.log('Table email was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('project')
            .then(() => {
                console.log('Table project was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('asset')
            .then(() => {
                console.log('Table asset was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
  ])
};
