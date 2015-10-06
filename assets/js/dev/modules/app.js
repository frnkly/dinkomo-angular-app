
angular.module('learn', [])

.controller('GeneralController', ['$scope', '$http', function($scope, $http) {

    $scope.name = 'Kojo';

}])

.controller('TestController', ['$scope', function($scope) {

    // console.log($scope.name);

}]);
