angular
.module('userModule')
.controller('loginCtrl', [
    '$scope', '$state',
    'userService',
function (
    $scope, $state,
    userService
) {
    $scope.data = {
        name: ''
    };

    $scope.login = function () {
        isNameValid(function () {
            userService.setUsername($scope.data.name);
            $state.go('chat');

        });
    };

    function isNameValid(onValid) {
        if ($scope.data.name === '') {
            alert('Nickname cannot be empty');
            return false;

        } else if ($scope.data.name.length < 3) {
            alert('Nickname should be min 3 characters long');
            return false;
        }

        userService.isUsernameFree($scope.data.name, function (result) {
            if (result) {
                onValid();

            } else {
                alert('Username taken, please choose different name');

            }
        });

    }
}]);