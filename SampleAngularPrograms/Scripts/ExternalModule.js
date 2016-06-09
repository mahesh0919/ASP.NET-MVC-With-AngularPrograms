var MyApp = angular.module("ExternalModule", []);

MyApp.controller('ExternalController', function ($scope) {
    $scope.ctrlVarName = "I am External Module Controller Variable";
});

