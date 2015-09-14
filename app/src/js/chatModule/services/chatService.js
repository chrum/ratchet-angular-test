angular
.module('chatModule')
.factory('chatService', [
    '$rootScope',
    'socket', 'userService',
function (
    $rootScope,
    socket, userService
) {
    var chatData = {
        username: null,
        usersList: [],
        messages: []
    };

    var init = function () {
        socket.subscribe('chat/usersList', function updateUsersList(data) {
            chatData.usersList = data;
            console.log('users list updated');
        });
        socket.subscribe('chat/newMessage', function onNewMessage(data) {
            chatData.messages.push(data);
        });

        chatData.username = userService.getUsername();
    };

    init();
    return {
        getData: function () {
            return chatData;
        },

        registerUsername: function (name) {
            socket.call('chat/registerUsername', {
                username: name
            });
        },

        sendMessage: function (newMessage) {
            socket.call('chat/sendMessage', {
                message: newMessage
            });
        }

    };
}]);