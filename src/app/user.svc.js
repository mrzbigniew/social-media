(function () {
    angular.module('app').service('UserSvc', [
        '$http', '$window',
        function ($http, $window) {
            const self = this;

            if($window.localStorage.getItem('token')){
                $http.defaults.headers.common['x-auth'] = $window.localStorage.getItem('token');
            }

            self.getUser = function () {
                return $http.get('/api/user')
            };

            self.login = function (username, password) {
                return $http.post('/api/session', {
                    username,
                    password
                }).then(function (response) {                   
                    $window.localStorage.setItem('token',response.data);
                    $http.defaults.headers.common['x-auth'] = $window.localStorage.getItem('token');
                    return self.getUser();
                });
            };

            self.addUser = function (username, password) {
                return $http.post('/api/user', {
                    username,
                    password
                });
            };

            self.logout = function () {
                return new Promise(function (resolve, reject) {
                    $window.localStorage.removeItem('token');
                    delete $http.defaults.headers.common['x-auth'];
                    resolve();
                });
            };
        }
    ])
}());
