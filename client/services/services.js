angular.module('services', [])


	.factory('OAuth', function($http) {
		var googleLogin = function (data) {	
			return $http({
				method: 'POST',
				url: '/api/oauth/google',
				// right now, i have no idea what format the data is coming in
				data: data
			});
		}

		return {
			googleLogin: googleLogin
		};
	});