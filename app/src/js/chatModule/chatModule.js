angular
.module('chatModule', ['ui.router'])
.config(['$stateProvider', function ($stateProvider) {
    $stateProvider
        .state('chat', {
            url: '/chat',
            templateUrl: 'chatModule/chatPage.html',
            controller: 'chatCtrl'
        });
}]);