/**
 *
 */
angular.module('nkomo.services')

.factory('DefinitionFactory', ['$http',
    function($http) {

        var apiEndpoint = 'http://api.dinkomo.vagrant/v0.1/';
        // var apiEndpoint = 'http://api.d.frnk.ca/v0.1/';

        return {

            count: function(type)
            {
                type = type || 'word';

                return $http.get(apiEndpoint + type + '/count');
            },

            search : function(term, type)
            {
                type = type || 'word';

    			return $http({
                    method: 'GET',
                    url: apiEndpoint + type + '/search/' + term
                });
    		}
        };
    }
]);
