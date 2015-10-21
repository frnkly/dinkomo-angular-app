
angular.module('nkomo.controllers').controller('MainController', ['$scope', 'assetVersion',
    function($scope, assetVersion) {

        $scope.assetVersion = assetVersion;

    }
]);
