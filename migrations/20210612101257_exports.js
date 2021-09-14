
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('export', (table) => {
            table.increments('id').primary();

            table.string('staking_type').notNullable();
            table.string('asset_name').notNullable();
            table.integer('number_of_days');
            table.integer('duration');

            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table export was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('export')
            .then(() => {
                console.log('Table export was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
