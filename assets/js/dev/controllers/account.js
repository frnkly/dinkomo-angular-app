/**
 *
 */
angular.module('nkomo.controllers')

.controller('AccountController', ['$scope', '$location', 'AccountService', 'Rover',
    function($scope, $location, AccountService, Rover) {

        // Check that user is signed in.
        if ($location.path() != '/login' && !AccountService.hasToken()) {
            return AccountService.setCredentials($location.path());
        }

        // Logs in user.
        $scope.login = function() {
            Rover.debug('Authenticating: ' + $scope.email);
            AccountService.authenticate($scope.email, $scope.password);
        };

        // Authentication URIs.
        $scope.localAuth    = AccountService.authURIs.local;
        $scope.facebookAuth = AccountService.authURIs.facebook;
        $scope.googleAuth   = AccountService.authURIs.google;
        $scope.linkedinAuth = AccountService.authURIs.linkedin;
        $scope.twitterAuth  = AccountService.authURIs.twitter;
    }
]);
