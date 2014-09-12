
var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/employee/:mode', {
                'templateUrl': 'html/employee.html',
                'controller': 'EmployeeController'
            })
            .when('/employee/:id/:mode', {
                'templateUrl': 'html/employee.html',
                'controller': 'EmployeeController'
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

app.controller('EmployeeController', function ($scope, $routeParams, $location) {

    $scope.mode ;

    $scope.employee ;

    $scope.employees =[] ;

    $scope.searchText;

    $scope.init = function(){
        console.log($routeParams.mode);
        $scope.mode = $routeParams.mode;
        if($scope.mode == 'new') {
            $scope.employee = {
                "score": "0000",
                "photo": "img/new-user.jpg"
            };
        }else if($scope.mode == 'search'){
            $scope.employees = [
                {
                    "id" : 1,
                    "fullName": "Manmay Mohanty",
                    "designation": "Senior Consultant",
                    "email": "manmay.mohanty@reverside.co.za",
                    "phone": "+27 749210674",
                    "quote": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac risus nibh.",
                    "score": "0025",
                    "photo": "img/manmay.jpg",
                    "address" : {
                        "city" : "Johannesberg",
                        "country" : "South Africa"
                    }
                },
                {
                    "id" : 2,
                    "fullName": "Soumya Pattanaik",
                    "designation": "Associate Consultant",
                    "email": "soumya.pattanaik@reverside.co.za",
                    "phone": "+27 749210674",
                    "quote": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac risus nibh.",
                    "score": "0025",
                    "photo": "img/soumya.jpg",
                    "address" : {
                        "city" : "Pretoria",
                        "country" : "South Africa"
                    }
                },
                {
                    "id" : 3,
                    "fullName": "Pragati Prusty",
                    "designation": "Associate Consultant",
                    "email": "pragati.prusty@reverside.co.za",
                    "phone": "+27 749210674",
                    "quote": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac risus nibh.",
                    "score": "0025",
                    "photo": "img/pragati.jpg",
                    "address" : {
                        "city" : "Sandton",
                        "country" : "South Africa"
                    }
                }
            ];
        }else {
            $scope.employee = {
                "fullName": "Soumya Pattanaik",
                "designation": "Associate Consultant",
                "email": "soumya.pattanaik@reverside.co.za",
                "phone": "+27 749210674",
                "quote": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac risus nibh.",
                "score": "0025",
                "photo": "img/soumya.jpg"
            };
        }

    };

    $scope.showEmployee = function(id){
      $location.path(decodeURI('/employee/'+id+'/view'));
    };

    $scope.hello = function (file) {
        console.log(file);
        var fileReader = new FileReader();
        fileReader.onload = function (event) {
            console.log("File Loaded.......");
            console.log(event.target.result);
            $scope.$apply(function () {
                $scope.employee.photo = event.target.result;
            });
            console.log($scope.employee.photo);
        };
        fileReader.readAsDataURL(file);
    };

});
