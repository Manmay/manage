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
        })
        .when('/home', {
            'templateUrl': 'html/home.html',
            'controller': 'homeCtrl'
        })
        .otherwise({ redirectTo: '/home' });
}]);

app.controller('rootCtrl', function ($scope, $http, $rootScope,  $window, $cookieStore, $cookies) {

    $scope.login = function(){
        console.log($cookies);
        var token = $cookies.token;
        if(token == undefined) {
            console.log('token not found');
            var redirectUrl = 'https://accounts.google.com/o/oauth2/auth?client_id=21960379372-a7l6nn0qb00peo711rc6vigoc1mrje6v.apps.googleusercontent.com&scope=profile email&response_type=code&redirect_uri=http://localhost:9090/login&approval_prompt=auto&state='+ encodeURIComponent($window.location.href);
            $window.location.href = redirectUrl;
        } else {
            console.log('token found');
            $scope.validate(token);
        }
    };

    $scope.validate = function(token){
        console.log('validate token');
        $http({
            method : "GET",
            url: "http://localhost:9090/validate/"+token
        }).success(function(data, status){
            console.log(data);
            if(data =='true'){
                console.log('token validation success');
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $cookies.token;
                $scope.getUser();

            }else{
                console.log('token validation failure');
                $cookieStore.remove('token');
                $scope.login();
            }

        }).error(function(error, status){
            console.log('token validation error');
            console.log(status);
        });
    }

    $scope.getUser = function(){
        console.log('get user detail');
        $http({
            method : "GET",
            url: "http://localhost:9090/api/employees/me"
        }).success(function(data, status){
            console.log('get user detail success');
            console.log(data);
            //if(data.doj == undefined)
                //data.doj = new Date();
            //if(data.designation == undefined)
            //    data.designation = '0';

            $rootScope.user = data;

        }).error(function(error, status){
            console.log('get user detail error');
            console.log(status);
        });
    };

    $scope.logout = function(){
        $window.location.href = 'http://localhost:9090/logout';
    };

});

app.controller('profileCtrl', function ($scope, $rootScope) {

    $scope.employee;

    $scope.init = function(){
        $scope.employee = angular.copy($rootScope.user);
    }

    $scope.submit = function(form){
        console.log('update profile');
        if(!form.$invalid){
            console.log($scope.employee);
            alert("Submit Form");
        }
    };

    $scope.reset = function(form) {
        if(form) {
            form.$setPristine();
        }
        $scope.employee = angular.copy($rootScope.user);
    };

});

app.controller('homeCtrl', function ($scope) {

});
