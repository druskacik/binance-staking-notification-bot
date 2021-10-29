
exports.up = function (knex) {
    return Promise.all([
        knex.schema.createTable('crypto_invoice', (table) => {
            table.increments('id').primary();

            table.integer('user_id').unsigned();
            table.foreign('user_id').references('user.id');
            table.string('telegram_chat_id').notNullable();
            table.string('message_id');

            table.string('invoice_id').notNullable();
            table.string('destination_address').notNullable();
            table.string('payment_link').notNullable();

            table.integer('amount_fiat').notNullable();
            table.string('currency_fiat').defaultTo('EUR');

            table.string('amount').notNullable();
            table.string('currency').defaultTo('BTC');
            table.integer('subscription_duration').notNullable().defaultTo(365);

            table.boolean('paid').defaultTo(false);
            table.boolean('settled').defaultTo(false);
            table.boolean('expired').defaultTo(false);

            table.timestamp('received_payment_at').defaultTo('0000-00-00 00:00:00');
            table.timestamp('settled_at').defaultTo('0000-00-00 00:00:00');
            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table crypto_invoice was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('crypto_invoice')
            .then(() => {
                console.log('Table crypto_invoice was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
