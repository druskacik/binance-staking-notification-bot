# Binance Staking Notification Bot

Bot that sends notifications (Telegram or email) when a specified staking option on Binance becomes available.

Web: https://bswatcher.com

Telegram bot: https://t.me/bstaking_bot

## Setting up the project

The project is built with `nuxt.js` and it requires [Node.js](https://nodejs.org/en/) installation (recommended version is `14.3.0` but everything `>=14` should suffice).

Running the project requires `.env` file with following structure:

```
DB_HOST=
DB_NAME=
DB_USER=
DB_PASS=
DB_PORT=
MAIL_FROM=
MAIL_HOST=
MAIL_PASS=
MAIL_PORT=
MAIL_USER=
MAIL_USER_2=
MAIL_USER_3=
MAIL_USER_4=
MAIL_USER_5=
MAIL_USER_6=
MAIL_USER_7=
MAIL_USER_8=
MAIL_USER_9=
MAIL_USER_10=
MAIL_USER_11=
MAIL_USER_12=
MAIL_USER_13=
MAIL_USER_14=
MAIL_USER_15=
MAIL_USER_16=
MAIL_USER_17=
MAIL_USER_18=
MAIL_USER_19=
MAIL_USER_20=
MAIL_USER_21=
BASE_URL=http://localhost:3000
CATCH_ALL_EMAIL_ADDRESS=any_email_address@test.com
TELEGRAM_BOT_TOKEN=
ADMIN_TELEGRAM_CHAT_ID=
STRIPE_API_TOKEN=
BTCPAY_URL=https://testnet.demo.btcpayserver.org
BTCPAY_API_KEY=
BTCPAY_STORE_ID=
```

Running locally requires a locally running database, recommended way to set it up is with [MariaDB](https://mariadb.org/) (environment variables starting with `DB_` should be set accordingly - see how they are used in `knexfile.js` and `backend/connection.js`).

After setting up the database it is necessary to run database migrations with the following command:

```bash
npx knex migrate:latest
```

This step is crucial and without it the bot will not work.

## Running the bot

Run whole project (frontend + backend) locally:

```bash
npm run dev
```

Running backend only (bot is included in the backend):

```bash
npm run backend
```

Run production server:

```bash
npm start
```