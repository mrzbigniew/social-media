'use strict'

describe("posts.svc", function () {
    let PostsSvc,
        $httpBackend;

    beforeEach(module('app'));

    describe('#fetch', function () {
        beforeEach(inject(function (_PostsSvc_, _$httpBackend_) {
            PostsSvc = _PostsSvc_;
            $httpBackend = _$httpBackend_;
            $httpBackend.when('GET', '/api/posts').respond([
                { username: 'alan', body: 'first post' },
                { username: 'alan', body: 'second post' }
            ]);
        }));

        afterEach(function () {
            $httpBackend.flush();
        });

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('has 2 posts', function () {
            PostsSvc.fetch().success(function (posts) {
                expect(posts).to.have.length(2);
            });
        });
    });

    describe('#create', function () {
        let postData = {
            body: 'new post'
        };

        beforeEach(inject(function (_PostsSvc_, _$httpBackend_) {
            PostsSvc = _PostsSvc_;
            $httpBackend = _$httpBackend_;
            $httpBackend.when('POST', '/api/posts', postData).respond(201);
        }));

        afterEach(function () {
            $httpBackend.verifyNoOutstandingExpectation();
            $httpBackend.verifyNoOutstandingRequest();
        });

        it('create post', function () {
            PostsSvc.create(postData).then(function (res) {
                expect(res.status).to.equal(201);
            });
            $httpBackend.flush();
        });
    });
});
