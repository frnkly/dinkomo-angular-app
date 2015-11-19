/**
 *
 */
angular.module('nkomo.controllers')

.controller('EditDefinitionController', [
    '$scope', '$routeParams', '$sessionStorage', '$location',
    'AccountService', 'DefinitionService', 'LanguageService', 'Rover',

    function($scope, $routeParams, $sessionStorage, $location,
        AccountService, DefinitionService, LanguageService, Rover) {

        Rover.debug('EditDefinitionController');

        // Make sure user is authenticated.
        if (!AccountService.isAuthenticated()) {
            return AccountService.setCredentials($location.path());
        }
        
        //
        // Language data.
        //

        $scope.langCode = $routeParams.langCode;
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

        // Saves a new or existing definition.
        $scope.definitionForm = {subType: 'n'};
        $scope.saveDefinition = function() {

            Rover.debug('Saving definition...');

            var definition = {
                title: $scope.definitionForm.title,
                alt_titles: $scope.definitionForm.altTitles || '',
                type: 0,
                sub_type: $scope.definitionForm.subType,
                translations: $scope.definitionForm.translations,
                languages: [$scope.language.code]
            };

            var save = $scope.definitionForm.id ? DefinitionService.update : DefinitionService.create;

            // save(definition).then(
            DefinitionService.create(definition).then(

                // On success, browse to definition page.
                function(response) {
                    $location.path('/' + $scope.language.code + '/define/' + response.data.title.replace(' ', '_'));
                },

                // On error.
                function(response) {
                    Rover.debug('on error...');
                    Rover.debug(response);
                }
            );
        };
    }
]);
