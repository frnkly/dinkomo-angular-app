/**
 *
 */
angular.module('nkomo.controllers')

.controller('MainController', ['$scope', '$sessionStorage', '$localStorage', 'Rover', 'assetVersion',
    function($scope, $sessionStorage, $localStorage, Rover, assetVersion) {

        $scope.assetVersion = assetVersion;

        // Globally available language and definition objects.
        $sessionStorage.languages = $sessionStorage.languages || {};
        $sessionStorage.definitions = $sessionStorage.definitions || {};

        // Toggles navigation links.
        $scope.toggleNav = function() {
            Rover.debug('toggling nav');
            $('aside .hidden-xs').show();
        };

    }
]);
