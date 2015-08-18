angular
.module('testApp', [
    'ui.router',
    'userModule',
    // 'homeModule'
])
.config()
.run([
    '$rootScope', '$location', '$state', '$timeout',
function ($rootScope, $location, $state, $timeout) {
    $timeout(function () {
        $state.go('login')
    })
}]);