'use strict'

describe('posts.ctrl', function () {
    beforeEach(module('app'));
    let $scope,
        ctrl,
        mockPostsSvc = {};

    beforeEach(inject(function ($injector) {
        const $q = $injector.get('$q');

        mockPostsSvc.fetch = function () {
            const deferred = $q.defer();

            deferred.resolve([
                { username: 'user1', body: 'body1' },
                { username: 'user2', body: 'body2' }
            ]);
            const p = deferred.promise;
            
            p.success = p.then;

            p.error = p.catch;

            return p;            
        };
    }));

    beforeEach(inject(function ($injector) {
        $scope = $injector.get('$rootScope').$new();
        const $controller = $injector.get('$controller');

        $controller('PostsCtrl', {
            $scope: $scope,
            PostsSvc: mockPostsSvc
        });
    }));

    it('load posts from service', function () {
        $scope.$digest();
        expect($scope.posts).to.have.length(2);
    });
});
