/*global io*/
angular
.module('socketsModule')
.factory('socket', [
    '$rootScope', '$timeout',
function ($rootScope, $timeout) {
    var socketService = {
        socket: null,

        on: (eventName, callback) => {
            this.socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(() => {
                    callback.apply(this.socket, args);
                });
            });
        },

        emit: (eventName, data, callback) => {
            this.socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(() => {
                    if (callback) {
                        callback.apply(this.socket, args);
                    }
                });
            });
        },

        init: () => {
            this.socket = io('http://localhost:8008');
        }
    };

    socketService.init();
    return socketService;
}]);