/**
 *
 */
angular.module('nkomo.rover', [])

.service('Rover', ['$window', '$sessionStorage', '$route', '$location',
    function($window, $sessionStorage, $route, $location) {

        // Dev variables.
        this.timestamp = Date.now();
        this.isLocal =
            (window.location.hostname == 'localhost' ||
                window.location.hostname.match(/.*\.local$/i) ||
                window.location.hostname.match(/.*\.vagrant$/i)) ? true : false;

        // Logs a message to the console.
        this.debug = function(msg) {
            if (this.isLocal && console) {
                console.log(msg);
            }
        };

    }
]);
