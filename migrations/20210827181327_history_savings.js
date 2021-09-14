
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('availability_history_locked_savings', (table) => {
            table.increments('id').primary();

            table.string('asset_name').notNullable();
            table.integer('duration');

            table.integer('project_id').unsigned();
            table.foreign('project_id').references('project.id');

            table.boolean('became_sold_out');

            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table availability_history_locked_savings was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('availability_history_locked_savings')
            .then(() => {
                console.log('Table availability_history_locked_savings was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
