/**
 *
 */
angular.module('nkomo.controllers')

.controller('SearchController', ['$scope', '$routeParams', 'DefinitionFactory',
    function($scope, $routeParams, DefinitionFactory) {

        $scope.params = $routeParams;

        // Search term.
        $scope.searchTerm = $routeParams.searchTerm;

        // Search results.
        $scope.results = [];
    }
]);
