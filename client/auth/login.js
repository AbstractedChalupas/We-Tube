angular.module('login', [])
	.controller("AuthController", function ($scope, OAuth) {
		$scope.data = {};
		$scope.post = OAuth.googleLogin;
	});