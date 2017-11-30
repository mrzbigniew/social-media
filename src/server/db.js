'use strict'

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/social', function(){
    console.log('Connected!');    
});
mongoose.Promise = global.Promise;

module.exports = mongoose;