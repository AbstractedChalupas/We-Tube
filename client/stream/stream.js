angular.module('stream', [])
	.controller('StreamController', function ($scope, getVideo, $http) {
		$scope.hello = "hello I'm a stream controller";
		$scope.videoId = "";
		$scope.startTime = 120;

		$scope.clearUrl = function(){
			$scope.url = ''
		}

		$scope.submitUrl = function(url){
			url = url.split("v=")
			//grabs the youtube video id
			$scope.videoId += url[1] 
			getVideo.setupPlayer($scope.videoId)			
		};
		$scope.logout = function() {
			return $http({
				method: "GET",
				url:'/api/logout'
			});
		}

		// getVideo.setupPlayer()
		//add in a function later to handle if they are jumping
		//in on a stream
	})