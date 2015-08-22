angular
.module('homeModule', ['ui.router'])
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'homeModule/homePage.html',
            controller: 'homeCtrl'
        })
}]);