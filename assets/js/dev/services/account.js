/**
 *
 */
angular.module('nkomo.services')

.service('AccountService', ['$window', '$location', '$http', '$sessionStorage', 'Rover', 'apiEndpoint',
    function($window, $location, $http, $sessionStorage, Rover, apiEndpoint) {

        // Uer data.
        $sessionStorage.auth = $sessionStorage.auth || {token: false};

        // Authentication URIs.
        this.authURIs = {
            local: apiEndpoint + '/auth/local',
            facebook: apiEndpoint + '/auth/facebook',
            google: apiEndpoint + '/auth/google',
            linkedin: apiEndpoint + '/auth/linkedin',
            twitter: apiEndpoint + '/auth/twitter'
        };

        // Authenticates user.
        // TODO: how do we include a minimum layer of security? https?
        this.authenticate = function(email, password, callback) {

            //
            $location.path('http://api.dinkomo.vagrant/auth');

            // $http.post(this.authURIs.local, {email: email, password: password}).then(
            //
            //     // If user was successfully authenticated, return token to callback function.
            //     function(response) {
            //
            //         // Store token for future use.
            //         $sessionStorage.auth.token = response.data.token;
            //
            //         // If we don't have a callback function, assume we want to redirect
            //         // user to return path.
            //         if (typeof callback != 'function') {
            //             return $location.path(this.returnPath);
            //         }
            //
            //         // Send token to callback function, and redirect user if callback returns true.
            //         if (callback.call(response.data.token)) {
            //             $location.path(this.returnPath);
            //         }
            //     }.bind(this),
            //
            //     function(response) {
            //         if (typeof callback == 'function') {
            //             callback.call(null);
            //         }
            //     }
            // );
        };

        this.hasToken = function() {
            return this.isAuthenticated();
        };

        this.isAuthenticated = function() {
            return $sessionStorage.auth.token && $sessionStorage.auth.token.length > 0;
        };

        // Redirects user to login form.
        this.setCredentials = function(returnTo) {

            //
            $sessionStorage.auth.returnTo = returnTo;
            var params = Rover.isLocal ? 'app.vagrant' : 'app';
            $window.location.href = 'http://api.dinkomo.vagrant/auth?next=' + params;

            // $location.path('/login');
            //
            // // Set return path.
            // this.returnPath = returnTo || '/';
        };
    }
]);
