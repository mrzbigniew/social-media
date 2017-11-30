(function () {
    'use strict'

    angular.module('app')
        .controller('ApplicationCtrl', [
            '$scope', '$location', 'UserSvc', '$window',
            function ($scope, $location, UserSvc, $window) {
                if($window.localStorage.getItem('token')){
                    UserSvc.getUser().then(function(response){
                        $scope.$emit('login',response.data);
                    });
                }
                
                $scope.$on('login', function (event, user) {
                    $scope.currentUser = user;
                    $location.path('/');
                });

                $scope.logout = function () {
                    $scope.currentUser = null;
                    UserSvc.logout().then(function () {
                        $scope.currentUser = null;
                        $location.path('/login');
                    });
                }

                $scope.$on('register:user', function (event, data) {
                    UserSvc.login(data.username, data.password).then(
                        function (response) {
                            $scope.$emit('login', data);
                        }
                    );                    
                });
            }
        ]);
}());
