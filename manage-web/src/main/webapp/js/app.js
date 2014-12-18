console.log(document.cookie.search('token'));

if(document.cookie.search('token')==-1){
    window.location = 'https://accounts.google.com/o/oauth2/auth?client_id=21960379372-a7l6nn0qb00peo711rc6vigoc1mrje6v.apps.googleusercontent.com&scope=profile email&response_type=code&redirect_uri=http://localhost:9090/login&state='+ window.location;
}

var app = angular.module('app', ['ngRoute', 'ngCookies']);

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/employee', {
            'templateUrl': 'employee/index.html',
            'controller': 'employeeController'
        });
}]);


app.controller('rootController', function ($scope, $rootScope, $routeParams, $location, $window, $cookieStore, $cookies, $document) {

    console.log('start : root controller');

    $scope.logout = function(){
        console.log('logout start....');
        $cookieStore.remove($cookies.token);
        delete $cookies["token"];
        console.log('logout start....');
        $document.cookie = undefined;
    };

});


app.controller('employeeController', function ($scope, $rootScope, $routeParams, $location) {

    console.log('start : employee controller');
});
