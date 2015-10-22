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

app.controller('searchEmployeeCtrl', function ($scope) {

    $scope.employees = [
        {
            "id": 1001,
            "firstName" : "Manmay",
            "lastName": "Mohanty",
            "photo": "https://dz2cdn2.dzone.com/storage/user-avatar/32729-thumb.jpg",
            "designation" : "Practice Manager",
            "location": "Johannesburg",
            "email" : "manmay.mohanty@reverside.co.za",
            "phone" : "0846860904"
        },
        {
            "id": 1001,
            "firstName" : "Mrunmay",
            "lastName": "Mohanty",
            "photo": "http://www.bothsidesofthetable.com/wp-content/uploads/2012/12/young-employee-955x1024.jpg",
            "designation" : "Associate",
            "location": "Sandton",
            "email" : "mrunmay.mohanty@reverside.co.za",
            "phone" : "0846860904"
        },
        {
            "id": 1002,
            "firstName" : "Karim",
            "lastName": "Baig",
            "photo": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTWfmgOhqz1cj9L8BI2skqmdaVpe_lPqEMChXZOSJWiXWVdZbOcuv0dPQ",
            "designation" : "Associate Consultant",
            "location": "Johannesburg",
            "email" : "karim.baig@reverside.co.za",
            "phone" : "0846860904"
        },
        {
            "id": 1002,
            "firstName" : "Ritimugdha",
            "lastName": "Das",
            "photo": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT5zfdu0lUOKbb1nTLBmg2a7yO3O5eYvmbMW59Ofva4iNvhhhctT5TjlOg",
            "designation" : "Associate Consultant",
            "location": "Santon",
            "email" : "ritimugdha.das@reverside.co.za",
            "phone" : "0846860904"
        },
        {
            "id": 1001,
            "firstName" : "Pragaty",
            "lastName": "Prusty",
            "photo": "https://dz2cdn2.dzone.com/storage/user-avatar/32729-thumb.jpg",
            "designation" : "Trainee",
            "location": "Northriding",
            "email" : "prgaty.prusty@reverside.co.za",
            "phone" : "0846860904"
        },
        {
            "id": 1001,
            "firstName" : "Soumya",
            "lastName": "Pattanaik",
            "photo": "http://www.bothsidesofthetable.com/wp-content/uploads/2012/12/young-employee-955x1024.jpg",
            "designation" : "Business Analyst",
            "location": "Sandton",
            "email" : "soumya.pattanaik@reverside.co.za",
            "phone" : "0846860904"
        },
        {
            "id": 1002,
            "firstName" : "Satyabrata",
            "lastName": "Mishra",
            "photo": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTWfmgOhqz1cj9L8BI2skqmdaVpe_lPqEMChXZOSJWiXWVdZbOcuv0dPQ",
            "designation" : "Consultant",
            "location": "Pretoria",
            "email" : "satyabrata.mishra@reverside.co.za",
            "phone" : "0846860904"
        },
        {
            "id": 1002,
            "firstName" : "Twinkle",
            "lastName": "Dey",
            "photo": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT5zfdu0lUOKbb1nTLBmg2a7yO3O5eYvmbMW59Ofva4iNvhhhctT5TjlOg",
            "designation" : "Senior Consultant",
            "location": "Pretoria",
            "email" : "twinkle.dey@reverside.co.za",
            "phone" : "0846860904"
        },
        {
            "id": 1001,
            "firstName" : "Manmay",
            "lastName": "Mohanty",
            "photo": "https://dz2cdn2.dzone.com/storage/user-avatar/32729-thumb.jpg",
            "designation" : "Practice Manager",
            "location": "Northriding",
            "email" : "manmay.mohanty@reverside.co.za",
            "phone" : "0846860904"
        },
        {
            "id": 1001,
            "firstName" : "Mrunmay",
            "lastName": "Mohanty",
            "photo": "http://www.bothsidesofthetable.com/wp-content/uploads/2012/12/young-employee-955x1024.jpg",
            "designation" : "Associate",
            "location": "Northriding",
            "email" : "manmay.mohanty@reverside.co.za",
            "phone" : "0846860904"
        },
        {
            "id": 1002,
            "firstName" : "Karim",
            "lastName": "Baig",
            "photo": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTWfmgOhqz1cj9L8BI2skqmdaVpe_lPqEMChXZOSJWiXWVdZbOcuv0dPQ",
            "designation" : "Associate Consultant",
            "location": "Northriding",
            "email" : "manmay.mohanty@reverside.co.za",
            "phone" : "0846860904"
        },
        {
            "id": 1002,
            "firstName" : "Ritimugdha",
            "lastName": "Das",
            "photo": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT5zfdu0lUOKbb1nTLBmg2a7yO3O5eYvmbMW59Ofva4iNvhhhctT5TjlOg",
            "designation" : "Associate Consultant",
            "location": "Northriding",
            "email" : "manmay.mohanty@reverside.co.za",
            "phone" : "0846860904"
        },
        {
            "id": 1001,
            "firstName" : "Manmay",
            "lastName": "Mohanty",
            "photo": "https://dz2cdn2.dzone.com/storage/user-avatar/32729-thumb.jpg",
            "designation" : "Practice Manager",
            "location": "Northriding",
            "email" : "manmay.mohanty@reverside.co.za",
            "phone" : "0846860904"
        },
        {
            "id": 1001,
            "firstName" : "Mrunmay",
            "lastName": "Mohanty",
            "photo": "http://www.bothsidesofthetable.com/wp-content/uploads/2012/12/young-employee-955x1024.jpg",
            "designation" : "Associate",
            "location": "Northriding",
            "email" : "manmay.mohanty@reverside.co.za",
            "phone" : "0846860904"
        },
        {
            "id": 1002,
            "firstName" : "Karim",
            "lastName": "Baig",
            "photo": "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTWfmgOhqz1cj9L8BI2skqmdaVpe_lPqEMChXZOSJWiXWVdZbOcuv0dPQ",
            "designation" : "Associate Consultant",
            "location": "Northriding",
            "email" : "manmay.mohanty@reverside.co.za",
            "phone" : "0846860904"
        },
        {
            "id": 1002,
            "firstName" : "Ritimugdha",
            "lastName": "Das",
            "photo": "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcT5zfdu0lUOKbb1nTLBmg2a7yO3O5eYvmbMW59Ofva4iNvhhhctT5TjlOg",
            "designation" : "Associate Consultant",
            "location": "Northriding",
            "email" : "manmay.mohanty@reverside.co.za",
            "phone" : "0846860904"
        }

    ];

});

app.controller('homeCtrl', function ($scope) {

});

