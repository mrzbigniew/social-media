'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const log = console.log.bind(console);

const cwd = process.cwd();

const app = express();

app.use(bodyParser.json());

app.use(require('./auth'));
app.use(require('./controller/static'));
app.use('/api/session', require('./controller/api/session'));
app.use('/api/user', require('./controller/api/user'));
app.use('/api/posts', require('./controller/api/post'));
app.use('/vendors', require('./controller/vendors'));

const server = app.listen(3000, function () {
    log('Server is listening at port number', 3000);
});

require('./websocket').connect(server);
