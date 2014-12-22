console.log(document.cookie.search('token'));

if(document.cookie.search('token')==-1){
    var redirectUrl = 'https://accounts.google.com/o/oauth2/auth?client_id=21960379372-a7l6nn0qb00peo711rc6vigoc1mrje6v.apps.googleusercontent.com&scope=profile email&response_type=code&redirect_uri=http://localhost:9090/login&approval_prompt=auto&state='+ encodeURIComponent(window.location.href);
    console.log(redirectUrl);
    window.location = redirectUrl;
}

var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/employee', {
            'templateUrl': 'employee/index.html',
            'controller': 'employeeController'
        });
}]);


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


app.controller('employeeController', function ($scope, $rootScope, $routeParams, $location) {

    console.log('start : employee controller');
});
