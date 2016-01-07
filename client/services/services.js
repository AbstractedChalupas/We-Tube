// <<<<<<< 74ec409484f43f9ca920decf110e7dac504c48bd
// app.factory('getVideo', function getVideo(url){
	
// })
// =======
angular.module('services', [])
	.factory('OAuth', function ($http) {
		var googleLogin = function (data) {	
			return $http({
				method: 'GET',
				url: '/auth/google/callback'
			});
		}

		return {
			googleLogin: googleLogin
		};
	})

	.factory('getVideo', function () {
		var videoDetails = function (cb) {
			var socket = io.connect('http://localhost:8001');
			socket.on('playerDetails', function (data) {
				cb(data);
			})
		}

		return {
			videoDetails: videoDetails
		};
	})
