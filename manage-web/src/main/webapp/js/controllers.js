var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/employee/search', {
            'templateUrl': 'html/employee/search.html',
            'controller': 'searchEmployeeCtrl'
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
            console.log('get user detail success' + data);
            $rootScope.user = data;

        }).error(function(error, status){
            console.log('get user detail error');
            console.log(status);
        });
    };

    $scope.logout = function(){
        $window.location.href = 'http://localhost:9090/logout';
    };

    $scope.closeAlert = function(){
       $rootScope.message = undefined;
    };

});

app.controller('profileCtrl', function ($scope, $rootScope, $http) {

    $scope.progress = false;

    $scope.employee;

    $scope.init = function(){
        $scope.employee = angular.copy($rootScope.user);
    }

    $scope.submit = function(form){
        console.log('update profile');
        if(!form.$invalid){
            console.log($scope.employee);
            var employee = {};
            employee.phone = $scope.employee.phone;
            employee.location = $scope.employee.location;
            employee.dateOfBirth = $scope.employee.dateOfBirth;
            employee.dateOfMarriage = $scope.employee.dateOfMarriage;
            $scope.updateEmployee(employee);
        }

    };

    $scope.updateEmployee = function(employee){
        $scope.progress = true;
        $http({
            method : "PUT",
            url: "http://localhost:9090/api/employees/me",
            headers : {
                "Content-Type" : "application/json"
            },
            data: employee
        }).success(function(data, status){
            $scope.progress = false;
            console.log('update user detail success');
            $rootScope.user = $scope.employee;
            $rootScope.message = "Profile Update Success";
        }).error(function(error, status){
            $scope.progress = false;
            console.log('update user detail error');
            console.log(status);
            $rootScope.message = "Error : " + error;

        });

    };

    $scope.reset = function(form) {
        if(form) {
            form.$setPristine();
        }
        $scope.employee = angular.copy($rootScope.user);
    };

});

app.controller('searchEmployeeCtrl', function ($scope, $rootScope, $http) {

    $scope.init = function(){
        console.log("[init] searchEmployeeCtrl");
        if($rootScope.employees == undefined){
            $scope.getEmployeeList();
        }
    };

    $scope.getEmployeeList = function(){
        console.log("[getEmployeeList] searchEmployeeCtrl");
        $scope.progress = true;
        $http({
            method : "GET",
            url: "http://localhost:9090/api/employees",
            headers : {
                "Accept" : "application/json"
            }
        }).success(function(data, status){
            console.log('get employee list success');
            $scope.progress = false;
            $rootScope.employees = data;
            $rootScope.message = "Get Employee List Success";
        }).error(function(error, status){
            $scope.progress = false;
            console.log('get employee list error : ' + error);
            $rootScope.message = "Error : " + error;
        });

    };

});

app.controller('homeCtrl', function ($scope) {

});

