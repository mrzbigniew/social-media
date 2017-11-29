(function () {
    angular.module('app').service('UserSvc', [
        '$http',
        function ($http) {
            const self = this;

            self.getUser = function () {
                return $http.get('/api/user', {
                    headers: {
                        'x-auth': self.token
                    }
                })
            };

            self.login = function (username, password) {
                return $http.post('/api/session',{
                    username,
                    password
                }).then(function(response){
                    self.token = response.data;
                    return self.getUser();
                });
            };

            self.addUser = function(username,password){
                return $http.post('/api/user',{
                    username,
                    password
                });
            };
        }
    ])
}());
