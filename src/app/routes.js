(function () {
    'use strict'

    angular.module('app').config(
        [
            '$routeProvider',
            function ($routeProvider) {
                $routeProvider
                    .when('/', {
                        controller: 'PostsCtrl',
                        templateUrl: 'layouts/posts.html'
                    })
                    .when('/register', {
                        controller: 'RegisterCtrl',
                        templateUrl: 'layouts/register.html'
                    })
                    .when('/login', {
                        controller: 'LoginCtrl',
                        templateUrl: 'layouts/login.html'
                    });
            }
        ]
    );
}());
