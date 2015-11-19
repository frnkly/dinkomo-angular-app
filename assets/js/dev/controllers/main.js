/**
 *
 */
angular.module('nkomo.controllers')

.controller('MainController', ['$scope', '$sessionStorage', '$localStorage', 'AccountService', 'Rover', 'assetVersion',
    function($scope, $sessionStorage, $localStorage, AccountService, Rover, assetVersion) {

        $scope.assetVersion = assetVersion;

        // Globally available language and definition objects.
        $sessionStorage.languages = $sessionStorage.languages || {};
        $sessionStorage.definitions = $sessionStorage.definitions || {};

        // Toggles navigation links.
        $scope.toggleNav = function() {
            // $('aside .toggles').toggleClass('hidden-xs');
            $('aside .toggles').toggleClass('hidden-xs');
        };

        //
        $scope.hasToken = AccountService.hasToken();
    }
]);
