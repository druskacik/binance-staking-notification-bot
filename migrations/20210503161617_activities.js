
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('saving_activity', (table) => {
            table.increments('id').primary();

            table.string('asset_name').notNullable();
            table.integer('duration');

            table.string('binance_id');
            table.string('project_name');

            table.float('interest_rate', 38, 16);
            table.float('interest_per_lot', 38, 16);

            table.string('lot_size');
            table.string('max_lots_per_user');
            table.string('lots_up_limit');

            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table saving_activity was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.alterTable('user', (table) => {
            table.boolean('subscribe_activities').defaultTo(0);
        })
            .then(() => {
                console.log('Column subscribe_activities was added to table user.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ])
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.alterTable('user', (table) => {
            table.dropColumn('subscribe_activities');
        })
            .then(() => {
                console.log('Column subscribe_activities was dropped from table user.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('saving_activity')
            .then(() => {
                console.log('Table saving_activity was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
  ])
};
