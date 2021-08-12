
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('message', (table) => {
            table.increments('id').primary();

            table.string('chat_id');
            table.string('message');

            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table message was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ])
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('message')
            .then(() => {
                console.log('Table message was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
  ])
};
