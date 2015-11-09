/**
 *
 */
angular.module('nkomo.services')

.factory('SearchFactory', ['$http', 'apiEndpoint',
    function($http, apiEndpoint) {

        return {

            any : function(query) {
                return $http.get(apiEndpoint + '/search/' + query + '?method=fulltext');
    		}
        };
    }
]);
