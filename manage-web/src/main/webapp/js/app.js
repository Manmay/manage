
var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/employee', {
            'templateUrl': 'employee/index.html',
            'controller': 'employeeController'
        });
}]);


app.controller('rootController', function ($scope, $rootScope, $routeParams, $location, $window) {

    console.log('start : root controller');

    $rootScope.user = null;

    if($rootScope.user == null){
        $window.location.href = 'https://accounts.google.com/o/oauth2/auth?client_id=21960379372-a7l6nn0qb00peo711rc6vigoc1mrje6v.apps.googleusercontent.com&scope=profile email&response_type=code&redirect_uri=http://localhost:8080/login.html';
    }


});


app.controller('employeeController', function ($scope, $rootScope, $routeParams, $location) {

    console.log('start : employee controller');
});
