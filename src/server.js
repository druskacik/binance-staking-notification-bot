const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const subscription = require('./routes/subscription');
const stakingInfo = require('./routes/staking-info');

app.use(cors());

// enforce HTTPS
const requireHTTPS = (req, res, next) => {
  // The 'x-forwarded-proto' check is for Heroku
  if (!req.secure && req.get('x-forwarded-proto') !== 'https' && process.env.NODE_ENV === "production") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}

app.use(requireHTTPS);

// starts all cronjobs
require('./cronjobs');

app.use(bodyParser.json());

app.use(express.static('./dist'));

app.use('/api/subscription', subscription);
app.use('/api/get-staking-info', stakingInfo);

const listen = (port) => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
  })
}

module.exports = listen;