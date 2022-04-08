require('dotenv').config();

const environment = process.env.NODE_ENV || 'development';

const config = (environment) => {
    if (environment === 'development') {
        return {
            client: 'mysql',
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT,
                charset: 'utf8',
                timezone: 'Europe/Bratislava',
            },
            pool: {
                min: 0,
                max: 20,
            },
        };
    } else {
    // change accordingly
        return {
            client: 'mysql',
            connection: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASS,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT,
                timezone: 'Europe/Bratislava',
            },
            pool: {
                min: 2,
                max: 10,
            },
            migrations: {
                tableName: 'knex_migrations',
            },
        };
    }
};

const connection = require('knex')(config(environment));

module.exports = connection;
