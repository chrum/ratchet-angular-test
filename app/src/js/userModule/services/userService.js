angular
.module('userModule')
.factory('userService', [
    '$rootScope',
    'socket',
function (
    $rootScope,
    socket
) {
    var userService = {
        data: {
            username: ''
        },

        setUsername: function (username) {
            this.data.username = username;
        },

        getUsername: function () {
            return this.data.username;
        },

        isUsernameFree: function (name, callback) {
            socket.call('chat/checkUsername', {
                username: name
            })
            .then(function (result) {
                if (result.available) {
                    callback(true);

                } else {
                    callback(false);
                }
            })
            .catch(function () {

            });
        },

        init: function () {
            socket.subscribe('chat/usersList', function () {
                console.log('users list updated');
            });
        }
    };

    userService.init();
    return userService;
}]);