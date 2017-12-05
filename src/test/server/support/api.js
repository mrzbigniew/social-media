const express = require('express');
const request = require('supertest');
const router = require('../../../server/controller/index');

const app = express();
app.use(router);

module.exports = request(app);
