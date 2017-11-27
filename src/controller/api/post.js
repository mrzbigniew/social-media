'use strict'

const Post = require('../../models/post');
const router = require('express').Router();

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
        username: req.body.username,
        body: req.body.body
    });

    post.save(function (err, post) {
        if (err) {
            return next(err);
        }
        res.status(201).json(post);
    });
});

router.delete('/:id', function (req, res, next) {
    Post.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            return next(err);
        }
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
        function (err) {
            if (err) {
                return next(err);
            }
            res.status(204).end();
        }
    );
});

module.exports = router;
