/**
 *
 */
angular.module('nkomo.controllers')

.controller('MainController', ['$scope', '$sessionStorage', '$localStorage', 'assetVersion',
    function($scope, $sessionStorage, $localStorage, assetVersion) {

        $scope.assetVersion = assetVersion;

        // Globally available language and definition objects.
        $sessionStorage.languages = $sessionStorage.languages || {};
        $sessionStorage.definitions = $sessionStorage.definitions || {};

    }
]);
