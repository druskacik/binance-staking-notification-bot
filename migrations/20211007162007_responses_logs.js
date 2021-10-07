
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('api_response_log', (table) => {
            table.increments('id').primary();

            table.string('request_type').notNullable();
            table.string('status');
            table.text('response_json');

            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table api_response_log was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('api_response_log')
            .then(() => {
                console.log('Table api_response_log was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
