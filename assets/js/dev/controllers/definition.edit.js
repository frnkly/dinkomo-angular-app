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
        // if (!AccountService.isAuthenticated()) {
        //     return AccountService.setCredentials($location.path());
        // }

        $scope.definitionId = $routeParams.definitionId;
        $scope.definition = $sessionStorage.definitions[$routeParams.definitionId] || null;
        $scope.formData = $sessionStorage.definitionFormData || null;

        // TODO: pull form data from API.
        // ...

        // Retrieve definition data.
        if (!$scope.definition)
        {
            Rover.debug('Retrieving definition # "'+ $scope.definitionId +'"...');

            DefinitionService.get($scope.definitionId).then(

                // Save definition object in $scope and $sessionStorage.
                function(response) {
                    $scope.definition = $sessionStorage.definitions[$routeParams.definitionId] = response.data;
                },
                function(response) {
                    Rover.debug('Could not retrieve definition data: ' + response.responseText);
                }
            );
        }

        // Form data.


        $scope.definitionForm = {subType: 'n'};


        // Stores a new definition.
        $scope.store = function() {

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
