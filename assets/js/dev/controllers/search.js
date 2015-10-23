/**
 *
 */
angular.module('nkomo.controllers')

.controller('SearchController', ['$scope', '$routeParams', 'DefinitionFactory', 'Rover',
    function($scope, $routeParams, DefinitionFactory, Rover) {

        Rover.debug('SearchController');

        $scope.params = $routeParams;

        // Search term.
        $scope.searchTerm = $routeParams.searchTerm;

        // Search results.
        $scope.results = [];

        $scope.lookup = function()
        {
            Rover.debug('Looking up "'+ $scope.searchTerm +'"...');

            DefinitionFactory.search($scope.searchTerm).then(

                // On success.
                function(response) {
                    Rover.debug(response)
                },

                // On error.
                function(response) {
                    Rover.debug('Error');
                    Rover.debug(response);
                }
            );
        };
    }
]);
