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

        isUsernameFree: function (name) {
            socket.emit('checkUsername', name, function () {

            });
        },

        init: function () {

        }
    };

    userService.init();
    return userService;
}]);