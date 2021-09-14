
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('availability_history_defi', (table) => {
            table.increments('id').primary();

            table.string('asset_name').notNullable();

            table.integer('project_defi_id').unsigned();
            table.foreign('project_defi_id').references('project_defi.id');

            table.boolean('sold_out');
            table.float('left_available', 38, 4);

            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table availability_history_defi was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('availability_history_defi')
            .then(() => {
                console.log('Table availability_history_defi was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
