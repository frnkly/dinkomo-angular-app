/**
 *
 */
angular.module('nkomo.controllers')

.controller('DefinitionController', [
    '$scope', '$routeParams', '$sessionStorage',
    'LanguageService', 'DefinitionService', 'Rover',

    function($scope, $routeParams, $sessionStorage, LanguageService, DefinitionService, Rover) {

        Rover.debug('DefinitionController');

        // Search parameters.
        $scope.searchTerm = $routeParams.searchTerm ? $routeParams.searchTerm.replace('_', ' ') : false;
        $scope.langCode = $routeParams.langCode;

        // Language data.
        $scope.language = $sessionStorage.languages[$routeParams.langCode] || null;

        if (!$scope.language)
        {
            Rover.debug('Retrieving language with code "'+ $scope.langCode +'"...');

            LanguageService.get($scope.langCode).then(

                // On success: Save the languge object in the $scope and the $sessionStorage.
                function(response) {
                    $scope.language = $sessionStorage.languages[$routeParams.langCode] = response.data;
                },

                // On error...
                function(response) {
                    Rover.debug('Could not retrieve language data.');
                }
            );
        }

        // Definition list.
        if ($scope.searchTerm)
        {
            $scope.definitions = $sessionStorage.definitions[$routeParams.searchTerm] || null;

            if (!$scope.definitions)
            {
                Rover.debug('Retrieving definitions for "'+ $scope.searchTerm +'"...');

                DefinitionService.search($scope.searchTerm, 'word', $scope.langCode).then(

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
    }
]);
