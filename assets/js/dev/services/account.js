/**
 *
 */
angular.module('nkomo.services')

.service('AccountService', ['$window', '$sessionStorage', '$route', '$location',
    function($window, $sessionStorage, $route, $location) {

        // Test...
        this.token = false;

        this.hasToken = function() {
            return false;
        };

        // Redirects user to login form.
        this.setCredentials = function() {
            $location.path('/login');
        };
    }
]);
