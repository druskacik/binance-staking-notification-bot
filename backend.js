// for development purporses only
// to run backend only, run 'npm run backend' from the command line

const express = require('express');

const server = require('./backend/src/server');

const port = process.env.PORT || 3000;

const app = express();

app.use('/api', server);

const listen = (port) => {
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}!`);
    });
};

listen(port);