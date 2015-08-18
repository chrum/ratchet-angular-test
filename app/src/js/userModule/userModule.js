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