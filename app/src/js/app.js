angular
.module('testApp', [
    'ui.router',
    'ngMaterial',
    'templatesModule',
    'userModule',
    'homeModule'
])
.run([
    '$rootScope', '$location', '$state', '$timeout',
function ($rootScope, $location, $state, $timeout) {
    $timeout(function () {
        $state.go('login')
    })
}]);