/**
 *
 */
angular.module('nkomo.services')

.service('AccountService', ['$location', 'Rover', 'apiEndpoint',
    function($location, Rover, apiEndpoint) {

        // Test...
        this.token = false;

        // Authentication URIs.
        this.authURIs = {
            local: apiEndpoint + '/auth/local',
            facebook: apiEndpoint + '/auth/facebook',
            google: apiEndpoint + '/auth/google',
            linkedin: apiEndpoint + '/auth/linkedin',
            twitter: apiEndpoint + '/auth/twitter'
        };

        this.hasToken = function() {
            return false;
        };

        // Redirects user to login form.
        this.setCredentials = function() {
            $location.path('/login');
        };
    }
]);
