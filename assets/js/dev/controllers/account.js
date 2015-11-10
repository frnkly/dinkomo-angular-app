/**
 *
 */
angular.module('nkomo.controllers')

.controller('AccountController', ['$scope', 'AccountService',
    function($scope, AccountService) {

        // Check that user is signed in.
        if (!AccountService.hasToken()) {
            return AccountService.setCredentials();
        }
    }
]);
