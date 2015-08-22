angular
.module('userModule')
.controller('loginCtrl', [
    '$scope', '$state',
function ($scope, $state) {
    $scope.login = function () {
        $state.go('home');
    }
}]);