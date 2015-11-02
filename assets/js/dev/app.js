/**
 * Main angular application.
 *
 */
var nkomoLearningApp = angular.module('learn', [
    'ngStorage', 'ngRoute',
    'nkomo.controllers', 'nkomo.directives', 'nkomo.services', 'nkomo.rover'
]);

//
// App constants.
//

var _appVersion = '0.0.2';
var _isLocal =
    (window.location.hostname == 'localhost' ||
        window.location.hostname.match(/.*\.local$/i) ||
        window.location.hostname.match(/.*\.vagrant$/i)) ? true : false;
var _assetVersion = _isLocal ? Date.now() : _appVersion;

nkomoLearningApp.constant('appVersion', _appVersion)
                .constant('isLocalEnvironment', _isLocal)
                .constant('assetVersion', _assetVersion);

//
// Initialize modules so that we can use them from different files.
//

var nkomoServices = angular.module('nkomo.services', ['nkomo.rover']);
var nkomoDirectives = angular.module('nkomo.directives', ['nkomo.rover']);
var nkomoControllers = angular.module('nkomo.controllers', ['nkomo.rover']);

//
// Configures the application.
//

nkomoLearningApp.config(['$routeProvider', 'assetVersion',
    function($routeProvider, assetVersion) {

        // Landing page.
        return $routeProvider.when('/', {
            redirectTo: '/dict'
        })

        // About page.
        .when('/about', {
			templateUrl: '/views/about.html?' + assetVersion,
            controller: 'PageController'
		})

        // Stats page.
        .when('/stats', {
			templateUrl: '/views/stats.html?' + assetVersion,
            controller: 'PageController'
		})

        // Search pages.
        .when('/dict/:searchTerm?', {
			templateUrl: '/views/search.html?' + assetVersion,
            controller: 'SearchController'
        })

        // Definition pages.
        .when('/:langCode/:searchTerm?', {
			templateUrl: '/views/definition.html?' + assetVersion,
            controller: 'DefinitionController'
        })

        // Else, redirect to search page.
        .otherwise({
			redirectTo: '/dict'
		});
    }
])

// Runs the application.
.run(['$rootScope', '$location', 'Rover',
    function ($rootScope, $location, Rover) {

        Rover.debug('Running app...');

    }
]);
