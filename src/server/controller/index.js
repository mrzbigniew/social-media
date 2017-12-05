'use strict'

const router = require('express').Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());

router.use(require('../auth'));
router.use('/api/session', require('./api/session'));
router.use('/api/user', require('./api/user'));
router.use('/api/posts', require('./api/posts'));
router.use('/vendors', require('./vendors'));
router.use(require('./static'));

module.exports = router;