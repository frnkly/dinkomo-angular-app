/**
 *
 */
angular.module('nkomo.controllers')

.controller('AddDefinitionController', [
    '$scope', '$routeParams', '$sessionStorage', '$location',
    'AccountService', 'DefinitionService', 'LanguageService', 'Rover',

    function($scope, $routeParams, $sessionStorage, $location,
        AccountService, DefinitionService, LanguageService, Rover) {

        Rover.debug('AddDefinitionController');

        // Make sure user is authenticated.
        // if (!AccountService.isAuthenticated()) {
        //     return AccountService.setCredentials($location.path());
        // }

        $scope.definitionType = $routeParams.definitionType;

        // TODO: pull form data from API.
        // $scope.formData = $sessionStorage.definitionFormData || null;
        $scope.formData = {
            types: {
                word: {
                    adj: 'Adjective',
                    adv: 'Adverb',
                    conn: 'Connective',
                    ex: 'Exclamation',
                    pre: 'Preposition',
                    pro: 'Pronoun',
                    n: 'Noun',
                    v: 'Verb'
                }
            }
        };

        $scope.definition = {subType: 'n'};

        // Stores a new definition.
        $scope.store = function() {

            Rover.debug('Saving definition...');

            var definition = {
                title: $scope.definition.title,
                alt_titles: $scope.definition.altTitles || '',
                type: 0,
                sub_type: $scope.definition.subType,
                translations: $scope.definition.translations,
                languages: [$scope.language.code]
            };

            var save = $scope.definition.id ? DefinitionService.update : DefinitionService.create;

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
