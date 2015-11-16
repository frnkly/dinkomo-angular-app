/**
 *
 */
angular.module('nkomo.controllers')

.controller('SearchController', [
    '$scope', '$routeParams', '$sessionStorage',
    'LanguageService', 'DefinitionService', 'SearchFactory', 'Rover',

    function($scope, $routeParams, $sessionStorage, LanguageService, DefinitionService, SearchFactory, Rover) {

        Rover.debug('SearchController');

        // Search parameters.
        $scope.searchTerm = $routeParams.searchTerm ? $routeParams.searchTerm.replace('_', ' ') : null;
        $scope.langCode = $routeParams.langCode;

        // Language data.
        $scope.language = $routeParams.langCode ?
            ($sessionStorage.languages[$routeParams.langCode] || null) : false;

        if ($scope.language === null)
        {
            Rover.debug('Retrieving language with code "'+ $scope.langCode +'"...');

            LanguageService.get($scope.langCode).then(

                // On success.
                function(response) {

                    // Save the languge object in the $scope and the $sessionStorage.
                    $scope.language = $sessionStorage.languages[$scope.langCode] = response.data;
                },

                // On error.
                function(response) {
                    Rover.debug('Could not retrieve language data.');
                }
            );
        }

        // Search results.
        $scope.results = null;

        // Queries the database.
        $scope.lookup = function(searchTerm, langCode) {

            // Default values.
            searchTerm = searchTerm || $scope.searchTerm;
            langCode = langCode || $scope.langCode;

            // Performance check.
            if (searchTerm.length < 1) {
                return;
            }

            // Definition lookup.
            if (langCode) {
                $scope.lookupDefinition(searchTerm, langCode);
            }

            // General lookup.
            else {
                $scope.lookupAnything(searchTerm, langCode);
            }
        };
        $scope.lookupDefinition = function(searchTerm, langCode) {

            Rover.debug('Looking up definitions matching "'+ searchTerm +'"...');

            // Notify user that we're querying the API.
            $scope.results = [];
            $scope.isSearching = true;

            DefinitionService.search(searchTerm, 'word', langCode).then(

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
        $scope.lookupAnything = function(searchTerm, langCode) {

            Rover.debug('Looking up anything matching "'+ searchTerm +'"...');

            // Notify user that we're querying the API.
            $scope.results = [];
            $scope.isSearching = true;

            SearchFactory.any(searchTerm).then(

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
            $scope.results = null;
            $scope.searchTerm = '';
        };

        // Generates the URL for a definition.
        $scope.url = function(def)
        {
            // Performance check.
            if (!def || !def.type) {
                return '#/dict';
            }

            var url = '#/dict', alias = def.title.replace(' ', '_');

            switch (def.type)
            {
                case 'word':
                    url = '#/' + def.mainLanguage.code + '/define/' + alias;
            }

            return url;
        };

        // If a search term already exists, query the API.
        if ($routeParams.searchTerm) {
            $scope.lookup();
        }
    }
]);
