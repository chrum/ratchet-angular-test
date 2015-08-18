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
/**
 * Created by chrystian on 8/18/15.
 */

angular
.module('userModule', ['ui.router'])
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'userModule/loginPage.html',
            controller: 'loginCtrl'
        })
}]);
angular
.module('userModule')
.controller([
    '$scope', '$state',
function ($scope, $state) {
    $scope.login = function () {
        $state.go('home');
    }
}]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC5qcyIsImhvbWVNb2R1bGUvaG9tZU1vZHVsZS5qcyIsInVzZXJNb2R1bGUvdXNlck1vZHVsZS5qcyIsInVzZXJNb2R1bGUvY29udHJvbGxlcnMvbG9naW5Db250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJhbmd1bGFyXG4ubW9kdWxlKCd0ZXN0QXBwJywgW1xuICAgICd1aS5yb3V0ZXInLFxuICAgICd1c2VyTW9kdWxlJyxcbiAgICAvLyAnaG9tZU1vZHVsZSdcbl0pXG4uY29uZmlnKClcbi5ydW4oW1xuICAgICckcm9vdFNjb3BlJywgJyRsb2NhdGlvbicsICckc3RhdGUnLCAnJHRpbWVvdXQnLFxuZnVuY3Rpb24gKCRyb290U2NvcGUsICRsb2NhdGlvbiwgJHN0YXRlLCAkdGltZW91dCkge1xuICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgJHN0YXRlLmdvKCdsb2dpbicpXG4gICAgfSlcbn1dKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgY2hyeXN0aWFuIG9uIDgvMTgvMTUuXG4gKi9cbiIsImFuZ3VsYXJcbi5tb2R1bGUoJ3VzZXJNb2R1bGUnLCBbJ3VpLnJvdXRlciddKVxuLmNvbmZpZyhbJyRzdGF0ZVByb3ZpZGVyJywgZnVuY3Rpb24gKCRzdGF0ZVByb3ZpZGVyKSB7XG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgLnN0YXRlKCdsb2dpbicsIHtcbiAgICAgICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3VzZXJNb2R1bGUvbG9naW5QYWdlLmh0bWwnLFxuICAgICAgICAgICAgY29udHJvbGxlcjogJ2xvZ2luQ3RybCdcbiAgICAgICAgfSlcbn1dKTsiLCJhbmd1bGFyXG4ubW9kdWxlKCd1c2VyTW9kdWxlJylcbi5jb250cm9sbGVyKFtcbiAgICAnJHNjb3BlJywgJyRzdGF0ZScsXG5mdW5jdGlvbiAoJHNjb3BlLCAkc3RhdGUpIHtcbiAgICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICRzdGF0ZS5nbygnaG9tZScpO1xuICAgIH1cbn1dKSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==