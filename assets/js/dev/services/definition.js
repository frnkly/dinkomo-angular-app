/**
 *
 */
angular.module('nkomo.services')

.factory('DefinitionService', ['$http', 'apiEndpoint', 'Rover',
    function($http, apiEndpoint, Rover) {

        return {

            count: function(type) {

                type = type || 'word';

                return $http.get(apiEndpoint + '/' + type + '/count');
            },

            get: function(title) {
                return $http.get(apiEndpoint + '/definition/exists/' + title);
            },

            search : function(term, definitionType, langCode, searchMethod) {

                langCode = langCode || '';
                definitionType = definitionType || 'word';
                var endpoint = apiEndpoint + '/' + definitionType + '/search/' + term;

                // Narrow search by language.
                endpoint += '?lang=' + langCode;

                // Specify search method.
                endpoint += '&method=fulltext';

    			return $http({method: 'GET', url: endpoint});
    		},

            create: function(definition) {
                // return $http.post(apiEndpoint + '/definition', definition);
                
                return $http({
                    method: 'POST',
                    url: apiEndpoint + '/definition',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        data: $.param(definition)
                    }
                });
            },

            update: function(definition) {

            },

            delete: function(definition) {

            }
        };
    }
]);
