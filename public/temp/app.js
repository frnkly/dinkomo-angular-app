
var app = angular.module('learn', []);

angular.module('learn').controller('GeneralController', ['$scope', '$http', function($scope, $http) {

    $scope.name = 'Kojo';

}]);

angular.module('learn').controller('TestController', ['$scope', function($scope) {

    // console.log($scope.name);

}]);
