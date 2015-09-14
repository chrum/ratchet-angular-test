angular
.module('chatModule')
.controller('chatCtrl', [
    '$scope', '$state', '$mdSidenav',
    'userService', 'chatService',
function (
    $scope, $state, $mdSidenav,
    userService, chatService
) {
    $scope.username = userService.getUsername();
    $scope.chatData = {
        username: null,
        usersList: [],
        messages: []
    };
    $scope.counter = 0;

    $scope.action = function () {
        $scope.counter++;
    };

    $scope.toggleLeftMenu = function () {
        $mdSidenav('left').toggle();
    };

    $scope.sendMessage = function () {
        if (!$scope.data || !$scope.data.currentMessage || $scope.data.currentMessage === '') {
            return;
        }
        chatService.sendMessage($scope.data.currentMessage);
        $scope.data.currentMessage = '';
    };

    function init() {
        $scope.chatData.messages.push({
            username: 'Bot',
            text: 'Hello ' + $scope.username
        });

        chatService.registerUsername($scope.username);
        $scope.chatData = chatService.getData();
    }

    init();
}]);