/**
 *
 */
angular.module('nkomo.services')

.factory('LanguageFactory', ['$http',
    function($http) {

        var apiEndpoint = 'http://api.dinkomo.vagrant/v0.1';
        // var apiEndpoint = 'http://api.d.frnk.ca/v0.1';

        return {

            count: function() {
                return $http.get(apiEndpoint + '/language/count');
            },

            get: function(langCode) {
                return $http.get(apiEndpoint + '/language/' + langCode);
            }
        };
    }
]);
