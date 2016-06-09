var MyApp = angular.module("Demo1", []);

MyApp.controller('StudentController', function ($scope) {
    $scope.ctrlVarName = "I am Controler Variable";
});

MyApp.directive('studentDirective', function () {
    return {
        template: "{{ctrlVarName}}",
        replace: true,
        restrict: 'E',
        controller: function ($scope) {
        console.log($scope);
    }
}
});