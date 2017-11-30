(function () {
    angular.module('app').controller('RegisterCtrl', [
        '$scope', 'UserSvc', '$rootScope',
        function ($scope, UserSvc, $rootScope) {
            $scope.register = function (username, password) {
                UserSvc.addUser(username, password)
                    .then(function (response) {
                        $rootScope.$broadcast('register:user', {
                            username: username,
                            password: password
                        });
                    },
                    function (response) {
                        $scope.error = {
                            message: response.data
                        }
                    }
                    );
            };
        }]
    );
}());
