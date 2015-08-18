angular
.module('userModule')
.controller([
    '$scope', '$state',
function ($scope, $state) {
    $scope.login = function () {
        $state.go('home');
    }
}])