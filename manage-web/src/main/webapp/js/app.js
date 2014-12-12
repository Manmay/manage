
var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/employee/search', {
                'templateUrl': 'html/employee/search.html',
                'controller': 'EmployeeSearchController'
            })
            .when('/employee/create', {
                'templateUrl': 'html/employee/create.html',
                'controller': 'EmployeeCreateController'
            })
            .when('/employee/:id/view', {
                'templateUrl': 'html/employee/view.html',
                'controller': 'EmployeeViewController'
            })
            .when('/employee/:id/update', {
                'templateUrl': 'html/employee/update.html',
                'controller': 'EmployeeUpdateController'
            })
            .when('/employee/:id/delete', {
                'templateUrl': 'html/employee/delete.html',
                'controller': 'EmployeeDeleteController'
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

app.controller('appController', function ($scope, $routeParams, $location) {
	
});


app.controller('EmployeeSearchController', function ($scope, $routeParams, $location) {

    $scope.employees =[] ;

    $scope.searchText;
    
    $scope.init = function(){
    	
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
    };

    $scope.viewEmployee = function(id){   	
      $location.path(decodeURI('/employee/'+id+'/view'));
    };

});

app.controller('EmployeeViewController', function ($scope, $routeParams, $location) {
	 
	$scope.employee ;
	
	$scope.init = function(){
		
		$scope.employee = {
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
            };
	};
	 
});


app.controller('EmployeeUpdateController', function ($scope, $routeParams, $location) {
	 
	$scope.employee ;
	
	$scope.init = function(){
		
		$scope.employee = {
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
            };
	};
	
	 $scope.update = function(){
		 console.log($scope.employee);
	  	 $location.path(decodeURI('/employee/1/view'));
	    	
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

app.controller('EmployeeCreateController', function ($scope, $routeParams, $location) {
	
	$scope.employee ;
	
	$scope.init = function(){
		
		$scope.employee = {
				"photo": "img/new-user.jpg",
				"score": "0000"
		};
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
    
    $scope.create = function(){
    	console.log($scope.employee);
    	 $location.path(decodeURI('/employee/search'));
    	
    };
});

app.controller('EmployeeDeleteController', function ($scope, $routeParams, $location) {
	 
	$scope.employee ;
	
	$scope.init = function(){
		
		$scope.employee = {
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
            };
	};
	
	 $scope.delete = function() {
		 console.log($scope.employee);
	  	 $location.path(decodeURI('/employee/1/view'));	    	
	 };
	 
	 $scope.cancel = function() {
		 console.log($scope.employee);
	  	 $location.path(decodeURI('/employee/1/view'));	    	
	 };
	 	 
});
