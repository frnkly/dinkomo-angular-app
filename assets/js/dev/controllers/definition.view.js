/**
 *
 */
angular.module('nkomo.controllers')

.controller('ViewDefinitionController', [
    '$scope', '$routeParams', '$sessionStorage', '$location',
    'AccountService', 'DefinitionService', 'LanguageService', 'Rover',

    function($scope, $routeParams, $sessionStorage, $location,
        AccountService, DefinitionService, LanguageService, Rover) {

        Rover.debug('ViewDefinitionController');

        //
        // Query parameters.
        //

        $scope.langCode = $routeParams.langCode;
        $scope.searchTerm = $routeParams.searchTerm ? $routeParams.searchTerm.replace('_', ' ') : false;

        // Checks if current path needs authentication.
        if ($routeParams.definitionId) {
            if (!AccountService.hasToken()) {
                return AccountService.setCredentials($location.path());
            }

            Rover.debug('Definition: ' + $routeParams.definitionId);
        }

        //
        // Language data.
        //

        $scope.language = $sessionStorage.languages[$routeParams.langCode] || null;

        if (!$scope.language)
        {
            Rover.debug('Retrieving language with code "'+ $scope.langCode +'"...');

            LanguageService.get($scope.langCode).then(

                // Save languge object in $scope and $sessionStorage.
                function(response) {
                    $scope.language = $sessionStorage.languages[$routeParams.langCode] = response.data;
                },
                function(response) {
                    Rover.debug('Could not retrieve language data: ' + response.responseText);
                }
            );
        }

        //
        // Definition data.
        //

        if ($scope.searchTerm)
        {
            $scope.definitions = $sessionStorage.definitions[$routeParams.searchTerm] || null;

            if (!$scope.definitions)
            {
                Rover.debug('Retrieving definitions for "'+ $scope.searchTerm +'"...');

                DefinitionService.search($scope.searchTerm, 'word', $scope.langCode).then(
                // DefinitionService.get($scope.searchTerm).then(

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
