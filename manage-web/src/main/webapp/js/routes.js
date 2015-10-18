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
        })
        .when('/profile', {
            'templateUrl': 'html/profile.html',
            'controller': 'profileCtrl'
        });
}]);





