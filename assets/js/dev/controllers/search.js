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

        // Looks up a word
        $scope.lookup = function(searchTerm)
        {
            Rover.debug('Looking up "'+ $scope.searchTerm +'"...');

            // Notify user that we're querying the API.
            $scope.results = [];
            $scope.isSearching = true;

            searchTerm = searchTerm || $scope.searchTerm;

            DefinitionFactory.search(searchTerm).then(

                // On success.
                function(response) {
                    $scope.isSearching = false;
                    $scope.results = response.data;
                },

                // On error.
                function(response) {
                    Rover.debug('Error');
                    Rover.debug(response);
                    $scope.isSearching = false;
                }
            );
        };

        // Clears the search form.
        $scope.clear = function()
        {
            $scope.results = [];
            $scope.searchTerm = '';
        };

        // If a search term already exists, query the API.
        if ($routeParams.searchTerm) {
            $scope.lookup($routeParams.searchTerm);
        }
    }
]);
