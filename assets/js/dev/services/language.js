/**
 *
 */
angular.module('nkomo.services')

.factory('LanguageService', ['$http', 'apiEndpoint',
    function($http, apiEndpoint) {

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
