angular
.module('userModule')
.factory('userService', [
    '$rootScope',
function (
    $rootScope
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

        init: function () {

        }
    };

    userService.init();
    return userService;
}]);