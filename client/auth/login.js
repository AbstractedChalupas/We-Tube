app.module('login', [])

	.controller("AuthController", [$scope, "OAuth"] {
		$scope.data = {}
		$scope.post = OAuth.googleLogin;
	})