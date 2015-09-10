angular
.module('chatModule')
.factory('chatService', [
    '$rootScope',
    'socket',
function (
    $rootScope,
    socket
) {
    var chatData = {
        usersList: []
    };

    var init = function () {
        socket.subscribe('chat/usersList', function updateUsersList(data) {
            chatData.usersList = data;
            console.log('users list updated');
        });
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
        }

    };
}]);