'use strict'

const express = require('express');
const log = console.log.bind(console);
const websocket = require('./websocket');
const logger = require('morgan');

const cwd = process.cwd();

const app = express();

app.use(logger('dev'));
app.use(require('./controller'));

const server = app.listen(3000, function () {
    log('Server is listening at port number', 3000);
});

websocket.connect(server);
