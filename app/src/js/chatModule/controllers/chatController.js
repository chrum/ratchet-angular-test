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
        usersList: []
    };
    $scope.counter = 0;

    $scope.messages = [];

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

        $scope.messages.push({
            name: $scope.username,
            text: $scope.data.currentMessage
        });
        $scope.data.currentMessage = '';

        if ($scope.messages.length > 10) {
            $scope.messages.shift();
        }
    };

    function init() {
        $scope.messages.push({
            name: 'Bot',
            text: 'Hello ' + $scope.username
        });

        chatService.registerUsername($scope.username);
        $scope.chatData = chatService.getData();
    }

    init();
}]);