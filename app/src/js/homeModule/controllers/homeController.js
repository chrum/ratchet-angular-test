angular
.module('homeModule')
.controller('homeCtrl', [
    '$scope', '$state', '$mdSidenav',
function (
    $scope, $state, $mdSidenav
) {
    $scope.title = 'Home page';
    $scope.counter = 0;
    $scope.action = function () {
        $scope.counter++;
    };

    $scope.toggleLeftMenu = function() {
        $mdSidenav('left').toggle();
    };
}]);