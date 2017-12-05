'use strict'

const Post = require('../../models/post');
const router = require('express').Router();
const websocket = require('../../websocket');

router.get('/', function (req, res, next) {
    Post.find(function (err, posts) {
        if (err) {
            return next(err);
        }
        res.status(200).json(posts);
    });
});

router.post('/', function (req, res, next) {
    const post = new Post({
        username: req.auth.username,
        body: req.body.body
    });

    post.save(function (err, post) {
        if (err) {
            return next(err);
        }
        websocket.broadcast('new_post',post);
        res.status(201).json(post);
    });
});

router.delete('/:id', function (req, res, next) {
    Post.findByIdAndRemove(req.params.id, function (err, post) {
        if (err) {
            return next(err);
        }
        websocket.broadcast('delete_post', post);
        res.status(204).end();
    });
});

router.put('/:id', function (req, res, next) {
    Post.findByIdAndUpdate(
        req.params.id,
        {
            username: req.body.username,
            body: req.body.body
        },
        function (err, post) {
            if (err) {
                return next(err);
            }
            websocket.broadcast('update_post', post);
            res.status(204).end();
        }
    );
});

module.exports = router;
