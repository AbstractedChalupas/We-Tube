angular.module('login', [])
	.controller("AuthController", function ($scope, OAuth) {
		$scope.data = {};
		console.log(OAuth.googleLogin);
		$scope.post = OAuth.googleLogin;
	});