/**
 *
 */
angular.module('nkomo.services')

.factory('DefinitionFactory', ['$http',
    function($http) {

        var endpoint = 'http://api.dinkomo.vagrant/v0.1';

        return {
            
            count: function() {
                return $http.get(endpoint + '/definition/count');
            },

            search : function(term) {
    			return $http.get(endpoint + '/definition/search/' + term);
    		}
        };
    }
]);
