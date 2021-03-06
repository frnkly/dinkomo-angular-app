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

            get: function(id) {
                return $http.get(apiEndpoint + '/definition/' + id);
            },

            match: function(title) {
                return $http.get(apiEndpoint + '/definition/title/' + title);
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
                return $http.post(apiEndpoint + '/definition', definition);
            },

            update: function(definition) {

            },

            delete: function(definition) {

            }
        };
    }
]);
