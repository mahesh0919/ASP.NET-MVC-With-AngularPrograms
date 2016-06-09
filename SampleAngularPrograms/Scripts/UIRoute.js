/// <reference path="angular-ui-router.js" />
var app = angular
            .module("Demo", ["ui.router"])               // inject UI.Route as dependency
            .config(function ($stateProvider, $urlMatcherFactoryProvider, $urlRouterProvider, $locationProvider) {

                $urlMatcherFactoryProvider.caseInsensitive(true); // Case insencitive URL's

                $urlRouterProvider.otherwise("/home");  //if state doent match , got to default route

                $locationProvider.html5Mode(true);    // this is to remove # in url routing 

                $stateProvider
                    .state("home", {
                        url: "/home",                    // This will generate href atrribute
                        templateUrl: "Home/Home",        // template URL to navigate
                        controller: "homeController",    // Controller to pass data to view
                        controllerAs: "homeCtrl"         // Alias to controller, insted of $scope use this object to bind data
                    })
                    .state("courses", {
                        url: "/courses",
                        templateUrl: "Home/Courses",
                        controller: "coursesController",
                        controllerAs: "coursesCtrl"
                    })
                    .state("studentParent", {    // create abstract parent class, this is similar to c# abstract class
                        url: "/students",
                        controller: "studentParentController",
                        controllerAs: "stdParentCtrl",
                        templateUrl: "Home/StudentParent",
                        resolve: {
                            parentMessage: function ($http) {    // this parentMessage' can be injected in both clid class controllers
                                return $http.get("Home/GetParentMessage")
                                        .then(function (response) {
                                            return response.data;
                                        })
                            }
                        },
                        abstract: true
                    })
                    //.state("studentParent.students", {
                    //    url: "/", // As the URL from the parent abstract state is prepended to the child state URL, the redundant part of the URL (/students) has been removed 
                    //    templateUrl: "Home/Students",
                    //    controller: "studentsController",
                    //    controllerAs: "studentsCtrl",
                    //    resolve: {                          // Resolve this before landing into Students view
                    //        studentslist: function ($http, $location) {
                    //            return $http.get("Home/GetListofStudents")
                    //                    .then(function (response) {
                    //                        return response.data;
                    //                    })
                    //        }
                    //    }
                    //})
                    // Creating Named views for the above
                    .state("studentParent.students", {
                        url: "/", // As the URL from the parent abstract state is prepended to the child state URL, the redundant part of the URL (/students) has been removed 
                        views: {
                            "studentData": {
                                templateUrl: "Home/Students",
                                controller: "studentsController",
                                controllerAs: "studentsCtrl",
                                resolve: {   // Resolve this before landing into Students view
                                    studentslist: function ($http) {
                                        return $http.get("Home/GetListofStudents")
                                                .then(function (response) {
                                                    return response.data;
                                                })
                                    }
                                }
                            },
                            "totalData": {
                                templateUrl: "Home/studentsTotal",
                                controller: "studentsTotalController",
                                controllerAs: "studentsTotalCtrl",
                            }
                        }
                    })
                    //.state("studentParent.studentDetails", {
                    //    url: "/:id",                            // UI route with parameters
                    //    templateUrl: "Home/studentDetails",
                    //    controller: "studentDetailsController",
                    //    controllerAs: "studentDetailsCtrl"
                    //})
                    .state("studentParent.studentDetails", { // child view of studentParent
                        url: "/:id",
                        views: {
                            "studentData": {
                                templateUrl: "Home/studentDetails",
                                controller: "studentDetailsController",
                                controllerAs: "studentDetailsCtrl"
                            }
                        }
                    })
                    .state("StudentSearchResults", {
                        url: "/StudentsSearchResults/:name",          // Name as input parameter
                        templateUrl: "Home/StudentsSearchResults",
                        controller: "StudentSearchController",
                        controllerAs: "StudentSearchCtrl"
                    })
                    .state("nestedScope", {                             // This is an example for nested controllers
                        url: "/nestedScope",
                        templateUrl: "Home/Nestedscope",
                        controller: "countryController"
                    })
                    .state("testDirectives", {                     // This is an example for directives
                        url: "/testDirectives",
                        templateUrl: "Home/TestDirectives",
                        controller: "TestDirectiveControllers"
                    })
                    .state("templateString", {                     // This is an example for directives
                        url: "/templateString",
                        template: 'Hello {{ studentsTotalController }}!',  // Template string 
                        controller: "TemplateStringControllers"
                    })
                    .state("directiveScope", {                     // This is an example for directives
                        url: "/directiveScope",
                        templateUrl: "Home/DirectiveScope",
                        controller: "StudentController"
                     })
            })
            .controller('StudentController', ['$scope', function ($scope) {
                $scope.name = "Mahesh Pendker";
                $scope.address = "Hyderabad";
                $scope.reverseName = function () {
                    $scope.name = $scope.name.split("").reverse().join("");
                };
            }])
            .controller("studentsTotalController", function ($scope) {
                $scope.test = 'Test Message';
            })
            .controller("TemplateStringControllers", function ($scope) {
                $scope.studentsTotalController = 'I am from Template String';
            })
            .controller("homeController", function ($scope, $rootScope) {
                $scope.message = "Home Page";
                $rootScope.text = "I am assigned to root scope and available to all controllers";
            })
            .controller("coursesController", function ($scope) {
                $scope.courses = ["C#", "VB.NET", "ASP.NET", "SQL Server"];
                $scope.AddCourses = function () {
                $scope.courses.push($scope.inputValue);
                };
            })
            .controller("studentsController", function ($scope, $http, $state, studentslist) {
                $scope.header = "List of students";
                     $scope.students = studentslist;       // this is resolved before hitting this controller
                     //$http.get("Home/GetListofStudents")
                     //                        .then(function (response) {
                     //                            $scope.students = response.data;
                     //                        });
                     // Reload student data without complete page refresh
                     $scope.reloadData = function () {
                         $state.reload();
                     };

                     $scope.StudentSearch = function () {
                         $state.go("StudentSearchResults", { name: $scope.name }) //  This is to redirect page
                     };

            })
             // creating below controllers for nested controllers
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
            .controller("studentDetailsController", function ($scope, $http, $stateParams) { //UI Route Parameters
                $http({
                    url: "Home/GetStudent",
                    method: "get",
                    params: { id: $stateParams.id }
                }).then(function (response) {
                    $scope.student = response.data;
                })
            })
            .controller("StudentSearchController", function ($scope, $http, $stateParams) { //UI Route Parameters
                $scope.welcome = 'Yoh have been searched for \'' + $stateParams.name + '\''; 
                if ($stateParams.name) {
                    $http({
                        url: "Home/GetStudentbyName",
                        method: "get",
                        params: { name: $stateParams.name }
                    }).then(function (response) {
                        $scope.students = response.data;
                    })
                }
                else
                {
                    $http.get("Home/GetListofStudents")
                   .then(function (response) {
                       $scope.students = response.data;
                   })
                }
            })
             .controller("studentParentController", function ($scope, parentMessage) {
                 $scope.parentMessage = parentMessage; // This is available to both child views
             })
             .controller("TestDirectiveControllers", function ($scope) {
                 $scope.testDitrectives = 'Test Directives';
             })
             .controller("DirectiveControler", function ($scope) {
                 $scope.mouseoverinDirective = function (input) {
                     $scope.directiveMessage = input;
                     alert('Calling Controller from Directive :' +  $scope.directiveMessage);
                 };
             })
.directive("testElement", function () {
    return {
        restrict: 'E',
        template: "<h1>This is Element Directive!</h1>"
    };
})
.directive("testAttribute", function () {
    return {
        restrict: 'A',
        template: "<h1>This is Attirbute Directive!</h1>"
        //templateUrl: 'my-customer.html' //my-customer.html contains  <h1>This is Attirbute Directive!</h1>
    };
})
.directive("testComment", function () {
    return {
        restrict: 'M',
        replace: true,
        template: "<h1>This is Comment Directive!</h1>"
    };
})
.directive("testClass", function () {
    return {   
        restrict: "C", //restrict: "EAMC",   --> we can also give all restrictions 
        template: "<h1>This is class directive!</h1>"
    };
})
//Directives Taking to Controllers
.directive("entering", function(){           // By default this is 'A' Attribute
    link: return function (scope, element, attrs){   //Access Controller Data scope. / pass data to controller from directive
        element.bind("mouseenter", function(){
            scope.mouseoverinDirective("I am From Directive");
        })
    }
})
//If the content within the panel element is intended to persist, the directive needs to have transclusion enabled:
.directive("welcome", function () {
    return {
        restrict: "E",
        scope: {},
        transclude: true,
        template: "<div>This is the welcome component</div><ng-transclude></ng-transclude>"
    }
})
//http://www.undefinednull.com/2014/02/11/mastering-the-scope-of-a-directive-in-angularjs/
//http://jsfiddle.net/shidhincr/eyNYw/4/?utm_source=website&utm_medium=embed&utm_campaign=eyNYw
//Change to parent scope will change scope in directive and ViceVersa
.directive('sharedDirective', function () {  // Shared (scope = false)
    return {
        template: "<div><br>My name in shared scope Directive: {{name}}<br> Change your Name in Directive: <input type='text' ng-model='name' /></div>",
        replace: true,
        restrict: 'EA',
        scope : false,
        controller: function ($scope) {
            console.log($scope);
        }
    }
})
//Changes to parent scope change scope in directe,but change to directive scope will not effect parent scope
//http://jsfiddle.net/shidhincr/q3kex/3/?utm_source=website&utm_medium=embed&utm_campaign=q3kex
.directive('inheritedDirective', function () {  // Inherit Directive (scope = true)
    return {
        template: "<div><br>My name in inherited scope Directive: {{name}}<br> Change your Name in Directive: <input type='text' ng-model='name' /></div>",
        replace: true,
        restrict: 'EA',
        scope: true,
        controller: function ($scope) {
            console.log($scope);
        }
    }
})
//This time, there will be a new scope created for the directive, but it will not be inherited from the parent scope. 
//This new scope also known as Isolated scope because it is completely detached from its parent scope.
//http://jsfiddle.net/shidhincr/q3kex/4/?utm_source=website&utm_medium=embed&utm_campaign=q3kex
//Scope : { } ( Directive gets a new isolated scope )
.directive("isolateDirective", function () {
    return {
        restrict: "EA",
        scope: {},
        template: "<div>My name in isolated scope Directive : {{name}}</div>" +
        "Change your name : <input type='text' ng-model='name'/>"
    };
})
//http://jsfiddle.net/shidhincr/pJLT8/10/?utm_source=website&utm_medium=embed&utm_campaign=pJLT8
.directive('isolatedDirectiveAdvanced', function () {  // Shared Directive, (scope = false)
    return {
        restrict: "EA",
        scope: {
            name: "@",
            address: "=",
            reverse: "&"
        },
        template: [
            "<div class='line'>",
            "Name : <strong>{{name}}</strong>;  Change name:<input type='text' ng-model='name' /><br/>",
            "</div><div class='line'>",
            "Address : <strong>{{address|uppercase}}</strong>;  Change Address:<input type='text' ng-model='address' /><br/></div>",
            "<br/><input type='button' ng-click='reverse()' value='Reverse Name'/>"
        ].join("")
    };
})



