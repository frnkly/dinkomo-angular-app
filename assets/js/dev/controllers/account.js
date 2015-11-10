/**
 *
 */
angular.module('nkomo.controllers')

.controller('AccountController', ['$scope', 'AccountService',
    function($scope, AccountService) {

        // Check that user is signed in.
        if (!Account.hasToken()) {
            return Account.setCredentials();
        }
    }
]);
