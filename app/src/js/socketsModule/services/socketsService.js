/*global ab*/
angular
.module('socketsModule')
.factory('socket', [
    '$rootScope', '$timeout', '$q',
function ($rootScope, $timeout, $q) {
    var isConnected = false;
    var session = null;

    var onOpen = function () {
        isConnected = true;
    };

    var onClose = function () {
        isConnected = false;
    };

    var init = function () {
        session = new ab.Session('ws://127.0.0.1:8008', onOpen, onClose, {
            skipSubprotocolCheck: true
        });
    };

    init();
    return {
        whenConnected: function (callback) {
            if (isConnected) {
                callback();

            } else {
                $timeout(() => {
                    this.whenConnected.call(this, callback);
                });
            }
        },
        call: function () {
            var args = arguments;
            var defered = $q.defer();
            if (session) {
                session.call.apply(session, args)
                .then(function (result) {
                    defered.resolve(result);

                }, function (error) {
                    defered.reject(error);
                });
            }

            return defered.promise;
        },

        subscribe: function (event, callback) {
            if (session) {
                session.subscribe(event, callback);
            }
        },

        publish: function (event, data) {
            if (session) {
                session.publish(event, data);
            }
        }

    };
}]);