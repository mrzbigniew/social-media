'use strict'

const express = require('express');
const router = express.Router();
const path = require('path');


router.use(express.static(path.normalize(__dirname + '/../../node_modules/')));

module.exports = router;