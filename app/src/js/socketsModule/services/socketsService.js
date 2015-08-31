/*global ab*/
angular
.module('socketsModule')
.factory('socket', [
    '$rootScope', '$timeout', '$q',
function ($rootScope, $timeout, $q) {
    var ss = {
        connection: null,
        session: null,

        call: function () {
            var args = arguments;
            var defered = $q.defer();
            if (this.session) {
                this.session.call.apply(this.session, args)
                .then(function (result) {
                    defered.resolve(result);

                }, function (error) {
                    defered.reject(error);
                });
            }

            return defered.promise;
        },

        sub: function (event, callback) {
            if (this.session) {
                this.session.subscribe(event, callback);
            }
        },

        pub: function (event, data) {
            if (this.session) {
                this.session.publish(event, data);
            }
        },

        _onOpen: function () {

        },

        _onClose: function () {

        },

        init: function () {
            this.session = new ab.Session('ws://127.0.0.1:8008', this._onOpen, this.onClose, {
                skipSubprotocolCheck: true
            });
        }
    };

    ss.init();
    return ss;
}]);