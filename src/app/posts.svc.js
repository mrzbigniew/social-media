(function () {
    'use strict'

    angular.module('app').service('PostsSvc', [
        '$http',
        function ($http) {
            this.fetch = function () {
                return $http.get('/api/posts');
            };

            this.create = function (post) {
                return $http.post('/api/posts', post);
            };

            this.update = function (id, data) {
                return $http.put(`/api/posts/${id}`, data);
            };

            this.remove = function (id) {
                return $http.delete(`/api/posts/${id}`);
            };
        }
    ]
    );
}());
