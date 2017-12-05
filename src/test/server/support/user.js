const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../../../src/server/config');
const User = require('../../../server/models/user');

exports.create = function (username, password, cb) {
    const user = new User({
        username: username
    });

    bcrypt.hash(password, 10, function (err, hash) {
        if (err) {
            return cb(err);
        }
        user.password = hash;
        
        user.save(function(err){
            if(err){
                return cb(err);
            }
            user.token = jwt.sign({username: user.username}, config.secret);
            cb(null, user);
        });
    });
};

exports.remove = function(data,cb){
    User.remove(data,cb);
};