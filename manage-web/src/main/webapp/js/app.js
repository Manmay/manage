/**
 * Created by f4789334 on 2014/09/05.
 */


var app = angular.module('app', []);

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

app.controller('EmployeeController', ['$scope', function ($scope, fileReader) {

    $scope.editable = true;

    $scope.employee = {
        "fullName": "Soumya Pattanaik",
        "designation": "Associate Consultant",
        "email": "soumya.pattanaik@reverside.co.za",
        "phone": "+27 749210674",
        "quote": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac risus nibh. Donec adipiscing luctus tur Lorem ipsum dolor sit amet, consectetur adipiscing eli",
        "score": "0025",
        "photo": "user_avatar.jpg"
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

}]);
