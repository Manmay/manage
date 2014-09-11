
var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/employee', {
                'templateUrl': 'html/employee.html',
                'controller': 'EmployeeController'
            })
            .when('/employee/:id', {
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

app.controller('EmployeeController', function ($scope, $routeParams) {

    $scope.mode ;

    $scope.employee ;

    $scope.init = function(){
        console.log($routeParams.mode);
        $scope.mode = $routeParams.mode;
        if($scope.mode == 'new') {
            $scope.employee = {
                "score": "0000",
                "photo": "img/new-user.jpg"
            };
        } else {
            $scope.employee = {
                "fullName": "Soumya Pattanaik",
                "designation": "Associate Consultant",
                "email": "soumya.pattanaik@reverside.co.za",
                "phone": "+27 749210674",
                "quote": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac risus nibh.",
                "score": "0025",
                "photo": "user_avatar.jpg"
            };
        }

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
