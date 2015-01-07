console.log(document.cookie.search('token'));

var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/employee', {
            'templateUrl': 'employee/index.html',
            'controller': 'employeeController'
        })
        .when('/employee/me', {
            'templateUrl': 'employee/me.html',
            'controller': 'employeeController'
        });
}]);


app.directive("ngFileSelect", function () {
    return {
        link: function ($scope, el) {
            el.bind("change", function (e) {
                var file = (e.srcElement || e.target).files[0];
                $scope.hello(file);
            })
        }
    }
});

app.controller('rootController', function ($scope, $http, $rootScope, $routeParams, $location, $window, $cookieStore, $cookies, $document, $http) {

    console.log('start : root controller');
    
    $scope.user ;
    
    //$http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.token;
    
    $http({
    	method : "GET",
    	url: "http://localhost:9090/api/employees/me",
        headers: {
            'Authorization' : 'Basic ' + $cookies.token
        }
    }).success(function(data, status){
    	$scope.user  = data;
    }).error(function(data, status){
    	console.log(status);
    });

    $scope.logout = function(){
       $window.location.href = 'http://localhost:9090/logout';
    };

});



app.controller('employeeController', function ($scope, $rootScope, $routeParams, $http, $cookies) {

    console.log('start : employee controller');

    $scope.user ;

    //$http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.token;

    $http({
        method : "GET",
        url: "http://localhost:9090/api/employees/me",
        headers: {
            'Authorization' : 'Basic ' + $cookies.token
        }
    }).success(function(data, status){
        $scope.user  = data;
        console.log(data);
    }).error(function(data, status){
        console.log(status);
    });

    $scope.hello = function (file) {
        console.log(file);
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            console.log("File Loaded.......");
            console.log(event.target.result);
            $scope.$apply(function () {
                $scope.user.photo = event.target.result;
            });
            console.log($scope.user.photo);
        };
        fileReader.readAsDataURL(file);
    };
});
