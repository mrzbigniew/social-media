'use strict'
const expect = require('chai').expect;
const api = require('../../support/api');
const Post = require('../../../../server/models/post');
const user = require('../../support/user');

describe('controllers.api.posts', function () {
    beforeEach(function (done) {
        Post.remove({}, done);
    });

    describe('GET /api/posts', function () {

        beforeEach(function (done) {
            const posts = [
                { body: 'post1', username: 'zbyszek' },
                { body: 'post2', username: 'zbyszek' },
                { body: 'post3', username: 'zbyszek' }
            ];

            Post.create(posts, done);
        });

        it('has 3 posts', function (done) {
            api.get('/api/posts')
                .expect(200)
                .expect(function (response) {
                    expect(response.body).to.have.length(3)
                })
                .end(done);
        });
    });

    describe('POST /api/posts', function () {
        let token;

        beforeEach(function (done) {
            user.create('zbyszek', 'pass', function (err, user) {
                token = user.token;
                done(err);
            });
        });

        beforeEach(function (done) {
            api.post('/api/posts')
                .set('x-auth', token)
                .send({ body: 'this is my first post' })
                .expect(201)
                .end(done);
        });

        it('added new post', function (done) {
            Post.findOne(function (err, post) {
                expect(post.body).to.equal('this is my first post');
                done(err);
            });
        });
    });
});
