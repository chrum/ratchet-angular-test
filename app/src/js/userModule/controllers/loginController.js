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
        if (isNameValid()) {
            userService.setUsername($scope.data.name);
            $state.go('home');
        }
    };

    function isNameValid() {
        if ($scope.data.name === '') {
            alert('Nickname cannot be empty');
            return false;

        } else if ($scope.data.name.length < 3) {
            alert('Nickname should be min 3 characters long');
            return false;
        } else if (!userService.isUsernameFree($scope.data.name)) {
            alert('Username taken, please choose different name');
            return false;
        }


        return true;
    }
}]);