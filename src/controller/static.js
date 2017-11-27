'use strict'

const express = require('express');
const router = express.Router();

router.use(express.static(__dirname + '/../assets/'));

router.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/src/app/layouts/posts.html');
});

module.exports = router;