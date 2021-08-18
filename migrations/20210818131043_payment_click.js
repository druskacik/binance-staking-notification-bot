
exports.up = function(knex) {
    return Promise.all([
        knex.schema.createTable('payment_button_click', (table) => {
            table.increments('id').primary();

            table.string('chat_id');
            table.string('data');

            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table payment_button_click was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ])
};

exports.down = function(knex) {
    return Promise.all([
        knex.schema.dropTable('payment_button_click')
            .then(() => {
                console.log('Table payment_button_click was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
  ])
};
