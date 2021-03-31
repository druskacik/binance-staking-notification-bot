
exports.up = function(knex) {

    return Promise.all([
        knex.schema.createTable('asset', (table) => {
            table.increments('id').primary();
            table.string('asset_name').notNullable();
        })
            .then(() => {
                console.log('Table asset was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('project', (table) => {
            table.increments('id').primary();
            table.integer('binance_id');
            table.string('asset_name').notNullable();

            table.integer('asset_id').unsigned();
            table.foreign('asset_id').references('asset.id');

            table.integer('duration');

            table.boolean('sold_out');

            table.float('interest_rate');
            table.float('daily_interest_rate');

            table.float('min_purchase_amount', 38, 4);
            table.float('max_purchase_amount', 38, 4);

            // table.decimal('min_purchase_amount');
            // table.decimal('max_purchase_amount');

        })
            .then(() => {
                console.log('Table project was created.');
            })
            .catch((err) => {
                console.log(err);
            })
    ])
  
};

exports.down = function(knex) {
  return Promise.all([
        knex.schema.dropTable('project')
            .then(() => {
                console.log('Table project was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.dropTable('asset')
            .then(() => {
                console.log('Table asset was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
  ])
};
