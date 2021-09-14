const dayjs = require('dayjs');

exports.up = function (knex) {
    const currentTimestamp = dayjs();
    // 8 days free trial for everyone from the moment of going live
    const duration = 8;
    const subscriptionEndTime = currentTimestamp.add(duration, 'day');
    const subscriptionEndDate = subscriptionEndTime.format('YYYY-MM-DD HH:mm:ss');

    return Promise.all([
        knex.schema.alterTable('user', (table) => {
            table.boolean('is_pro').defaultTo(1);
            table.timestamp('subscription_end_date').defaultTo(subscriptionEndDate);
        })
            .then(() => {
                console.log('Columns is_pro, subscription_end_date were added to table user.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('transaction', (table) => {
            table.increments('id').primary();

            table.integer('user_id').unsigned();
            table.foreign('user_id').references('user.id');
            table.string('telegram_chat_id');

            table.integer('price_paid');
            table.string('currency').defaultTo('EUR');
            table.integer('duration').notNullable();

            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table transaction was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('transaction')
            .then(() => {
                console.log('Table transaction was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.alterTable('user', (table) => {
            table.dropColumn('is_pro');
            table.dropColumn('subscription_end_date');
        })
            .then(() => {
                console.log('Columns is_pro, subscription_end_date were dropped from table user.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
