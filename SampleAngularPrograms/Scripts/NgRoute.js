var app = angular
         .module("Demo", ["ngRoute"])                         // declare a module and inject route module
         .config(function ($routeProvider, $locationProvider) // $locationProvider to remove # in url
         {
             $locationProvider.html5Mode(true);
             $routeProvider.caseInsensitiveMatch = true;

             $routeProvider  // check routing patterns in href to redirect views
                 .when("/home",
                 {
                     templateUrl: "Home/Home",
                     controller: "homeController"
                 })
                 .when("/COURSES",
                 {
                     templateUrl: "Home/Courses",
                     controller: "coursesController"
                 })
                 .when("/students",
                 {
                     templateUrl: "Home/Students",
                     controller: "StudentsController",
                     controllerAs: "studentsCtrl",
                     resolve: {                         // this is resolved before invoking view
                         studentslist: function ($http) {
                             return $http.get("Home/GetListofStudents")
                                     .then(function (response) {
                                         return response.data;
                                     })
                         }
                     }
                 })
                 .when("/students/:id?", {              // :id? indicates default parameter
                     templateUrl: "Home/studentDetails",
                     controller: "studentDetailsController"
                 })
                 .when("/nestedScope",
                 {
                     templateUrl: "Home/Nestedscope",
                     controller: "countryController"
                 })
                 .otherwise({
                        redirectTo: "/home"
                 })
         })
         .controller("homeController", function ($scope, $rootScope) {
             $scope.message = "Home Page";
             $rootScope.text = "I am assigned to root scope and available to all controllers";
         })
         .controller("coursesController", function ($scope) {

             $scope.$on("$routeChangeStart", function (event, next, current) {
                 if (!confirm("Are you sure you want to navigate away from this page")) {
                     event.preventDefault();
                 }
             });

             $scope.courses = ["C#", "VB.NET", "ASP.NET", "SQL Server"];
             $scope.AddCourses = function () {
                 $scope.courses.push($scope.inputValue);
             };
         })
         .controller("StudentsController", function ($scope, $http, $route, studentslist) {
             this.header = "List of students";
             $scope.students = studentslist;
             //$http.get("Home/GetListofStudents")
             //                        .then(function (response) {
             //                            $scope.students = response.data;
             //                        });
             // Reload student data without complete page refresh
             $scope.reloadData = function () {
                 $route.reload();
             };
         })
        .controller("studentDetailsController", function ($scope, $http, $routeParams) {
            $http({
                url: "Home/GetStudent",
                method: "get",
                params: { id: $routeParams.id }
            }).then(function (response) {
                $scope.student = response.data;
            });
        })
         .controller("countryController", function ($scope) {
             $scope.name = "India";
             this.name = "India";
         })
         .controller("stateController", function ($scope) {
             $scope.name = "Telengana";
             this.name = "Telangana";
         })
         .controller("cityController", function ($scope) {
             $scope.name = "Hyderabad";
             this.name = "Hyderabad";
         })

.directive("testElement", function() {
    return {
        restrict: 'E',
        template : "<h1>This is Element Directive!</h1>"
    };
})
.directive("testAttribute", function() {
    return {
        restrict: 'A',
        template : "<h1>This is Attirbute Directive!</h1>"
    };
})
.directive("testComment", function() {
    return {
        restrict: 'M',
        replace : true,
        template : "<h1>This is Comment Directive!</h1>"
    };
})
.directive("testClass", function() {
    return {
        restrict : "C",
        template : "<h1>This is class directive!</h1>"
    };
})
