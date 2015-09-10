angular
.module('testApp', [
    'ui.router',
    'ngMaterial',
    'templatesModule',
    'userModule',
    'chatModule',
    'socketsModule'
])
.run([
    '$rootScope', '$location', '$state', '$timeout',
    'socket',
function (
    $rootScope, $location, $state, $timeout,
    socket
) {
    $location.path('/');
    socket.whenConnected(function () {
        $state.go('login');
    });
}]);