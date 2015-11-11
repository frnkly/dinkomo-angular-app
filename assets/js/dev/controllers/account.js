/**
 *
 */
angular.module('nkomo.controllers')

.controller('AccountController', ['$scope', '$location', 'AccountService',
    function($scope, $location, AccountService) {

        // Check that user is signed in.
        if ($location.path() != '/login' && !AccountService.hasToken()) {
            return AccountService.setCredentials();
        }

        // Authentication URIs.
        $scope.localAuth    = AccountService.authURIs.local;
        $scope.facebookAuth = AccountService.authURIs.facebook;
        $scope.googleAuth   = AccountService.authURIs.google;
        $scope.linkedinAuth = AccountService.authURIs.linkedin;
        $scope.twitterAuth  = AccountService.authURIs.twitter;
    }
]);
