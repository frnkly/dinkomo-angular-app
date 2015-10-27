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

        $scope.testLookup = function() {
            $scope.results = [
                {
                    "title": "ɔdɔ",
                    "alt_titles": " do,  dɔ,  odo",
                    "type": "word",
                    "sub_type": "noun",
                    "translation": {
                        "practical": {"eng": "love"},
                        "literal": {"eng": ""},
                        "meaning": {"eng": "an intense feeling of deep affection"}
                    },
                    "language": {
                        "twi": "Asante Twi",
                        "aka": "Akan"
                    },
                    "main_language": {
                        "code": "twi",
                        "parent_code": "aka",
                        "name": "Asante Twi",
                        "alt_names": " Ashanti,  Twi"
                    }
                },
                {
                    "title": "ɔdɔ",
                    "alt_titles": " do,  dɔ,  odo",
                    "type": "word",
                    "sub_type": "noun",
                    "translation": {
                        "practical": {"eng": "love"},
                        "literal": {"eng": ""},
                        "meaning": {"eng": "an intense feeling of deep affection"}
                    },
                    "language": {
                        "twi": "Asante Twi",
                        "aka": "Akan"
                    },
                    "main_language": {
                        "code": "twi",
                        "parent_code": "aka",
                        "name": "Asante Twi",
                        "alt_names": " Ashanti,  Twi"
                    }
                }
            ];
        };

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
