
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('asset_locked_savings', (table) => {
            table.increments('id').primary();
            table.string('asset_name').notNullable();
        })
            .then(() => {
                console.log('Table asset_locked_savings was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('project_locked_savings', (table) => {
            table.increments('id').primary();
            table.string('asset_name').notNullable();
            table.string('project_id');

            table.integer('asset_id').unsigned();
            table.foreign('asset_id').references('asset_locked_savings.id');

            table.integer('duration');

            table.boolean('sold_out');

            table.float('interest_rate', 38, 16);
        })
            .then(() => {
                console.log('Table project_locked_savings was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('user_locked_savings_notification', (table) => {
            table.increments('id').primary();

            table.integer('user_id').unsigned();
            table.foreign('user_id').references('user.id');
            table.integer('asset_locked_saving_id').unsigned();
            table.foreign('asset_locked_saving_id').references('asset_locked_savings.id');

            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table user_locked_savings_notification was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.alterTable('user', (table) => {
            table.boolean('subscribe_locked_savings').defaultTo(0);
        })
            .then(() => {
                console.log('Column subscribe_locked_savings was added to table user.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.alterTable('user', (table) => {
            table.dropColumn('subscribe_locked_savings');
        })
            .then(() => {
                console.log('Column subscribe_locked_savings was dropped from table user.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('user_locked_savings_notification')
            .then(() => {
                console.log('Table user_locked_savings_notification was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('project_locked_savings')
            .then(() => {
                console.log('Table project_locked_savings was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('asset_locked_savings')
            .then(() => {
                console.log('Table asset_locked_savings was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
