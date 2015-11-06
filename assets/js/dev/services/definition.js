/**
 *
 */
angular.module('nkomo.services')

.factory('DefinitionFactory', ['$http', 'apiEndpoint',
    function($http, apiEndpoint) {

        return {

            count: function(type)
            {
                type = type || 'word';

                return $http.get(apiEndpoint + '/' + type + '/count');
            },

            search : function(term, definitionType, langCode, searchMethod)
            {
                langCode = langCode || '';
                definitionType = definitionType || 'word';
                var endpoint = apiEndpoint + '/' + definitionType + '/search/' + term;

                // Narrow search by language.
                endpoint += '?lang=' + langCode;

                // Specify search method.
                endpoint += '&method=fulltext';

    			return $http({method: 'GET', url: endpoint});
    		}
        };
    }
]);
