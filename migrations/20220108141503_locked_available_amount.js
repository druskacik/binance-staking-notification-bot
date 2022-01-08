
exports.up = function (knex) {

    return Promise.all([
        knex.schema.alterTable('availability_history_locked', (table) => {
            table.float('left_available', 38, 8);
        })
            .then(() => {
                console.log('Column left_available was added to availability_history_locked.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};

exports.down = function (knex) {
    return Promise.all([
        knex.schema.alterTable('availability_history_locked', (table) => {
            table.dropColumn('left_available');
        })
            .then(() => {
                console.log('Column left_available was dropped from table availability_history_locked.');
            })
            .catch((err) => {
                console.log(err);
            }),
    ]);
};
