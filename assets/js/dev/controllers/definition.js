/**
 *
 */
angular.module('nkomo.controllers')

.controller('DefinitionController', [
    '$scope', '$routeParams', '$sessionStorage',
    'LanguageFactory', 'DefinitionFactory', 'Rover',

    function($scope, $routeParams, $sessionStorage, LanguageFactory, DefinitionFactory, Rover) {

        Rover.debug('DefinitionController');

        // Search parameters.
        $scope.searchTerm = $routeParams.searchTerm.replace('_', ' ');
        $scope.langCode = $routeParams.langCode;

        // Language data.
        $scope.language = $sessionStorage.languages[$routeParams.langCode] || null;

        if (!$scope.language)
        {
            Rover.debug('Retrieving language with code "'+ $scope.langCode +'"...');

            LanguageFactory.get($scope.langCode).then(

                // On success.
                function(response) {

                    // Save the languge object in the $scope and the $sessionStorage.
                    $scope.language = $sessionStorage.languages[$routeParams.langCode] = response.data;
                },

                // On error.
                function(response) {
                    Rover.debug('Could not retrieve language data.');
                }
            );
        }

        // Definition list.
        $scope.definitions = $sessionStorage.definitions[$routeParams.searchTerm] || null;

        if (!$scope.definitions)
        {
            Rover.debug('Retrieving definitions for "'+ $scope.searchTerm +'"...');

            DefinitionFactory.search($scope.searchTerm, 'word', $scope.langCode).then(

                // On success.
                function(response) {

                    // Save the definition list locally and in the sessionStorage.
                    $scope.definitions = $sessionStorage.definitions[$routeParams.searchTerm] = response.data;
                },

                // On error.
                function(response) {
                    Rover.debug('Could not retrieve definitions.');
                }
            );
        }
    }
]);
