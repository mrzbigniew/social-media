'use strict'

const db = require('../db');

// const user = db.model('User',{
//     username: {
//         type: String,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true,
//         select : false
//     }
// });
// module.exports = user;

// The same as commented above
const user = db.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false,
        select : false
    }
});

module.exports = db.model('User',user);
