'use strict'

const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static(path.normalize(__dirname + '/../../../dist/')));

router.get('/', function(req,res){
    res.sendFile(path.normalize(__dirname + '/../../../dist/layouts/posts.html'));
});

module.exports = router;