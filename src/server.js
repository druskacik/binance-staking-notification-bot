const express = require('express');

const app = express();

// starts all cronjobs
require('./cronjobs');

const listen = (port) => {
  app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
  })
}

module.exports = listen;