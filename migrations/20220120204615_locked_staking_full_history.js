
exports.up = function (knex) {
    return Promise.all([
        knex.schema.alterTable('project', (table) => {
            table.float('up_limit', 38, 8);
            table.timestamp('issue_start_time');
            table.timestamp('issue_end_time');
        })
            .then(() => {
                console.log('Columns up_limit, issue_start_time, issue_end_time were added to table project.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.createTable('history_locked_staking_full', (table) => {
            table.increments('id').primary();

            table.string('asset_name').notNullable();

            table.integer('project_id').unsigned();
            table.foreign('project_id').references('project.id');

            table.boolean('sold_out');
            table.float('left_available', 38, 8);

            table.timestamp('created_at').defaultTo(knex.fn.now());
        })
            .then(() => {
                console.log('Table history_locked_staking_full was created.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.dropTable('history_locked_staking_full')
            .then(() => {
                console.log('Table history_locked_staking_full was deleted.');
            })
            .catch((err) => {
                console.log(err);
            }),
        knex.schema.alterTable('project', (table) => {
            table.dropColumn('up_limit');
            table.dropColumn('issue_start_time');
            table.dropColumn('issue_end_time');
        })
            .then(() => {
                console.log('Columns up_limit, issue_start_time, issue_end_time were dropped from table project.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
