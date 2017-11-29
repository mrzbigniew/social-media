(function () {
    angular.module('app').controller(
        'RegisterCtrl',
        ['$scope', 'UserSvc', function ($scope, UserSvc) {
            $scope.register = function (username, password) {
                UserSvc.addUser(username, password).then(function (response) {
                    $scope.username = null;
                    $scope.password = null;
                });
            };
        }]
    );
}());
