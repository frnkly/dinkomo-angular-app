/**
 *
 */
angular.module('nkomo.controllers')

.controller('DefinitionController', ['$scope', '$routeParams', 'DefinitionFactory', 'Rover',
    function($scope, $routeParams, DefinitionFactory, Rover) {

        Rover.debug('DefinitionController');

        // Search parameters.
        $scope.searchTerm = $routeParams.searchTerm.replace('_', ' ');
        $scope.langCode = $routeParams.langCode;

    }
]);
