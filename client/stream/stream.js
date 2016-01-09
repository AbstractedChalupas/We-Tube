angular.module('stream', [])
	.controller('StreamController', function ($scope, getVideo) {
		$scope.hello = "hello I'm a stream controller";
		$scope.videoId = "";
		$scope.startTime = 120;

		$scope.submitUrl = function(url){
			url = url.split("v=")
			//grabs the youtube video id
			$scope.videoId += url[1] 
			getVideo.setupPlayer($scope.videoId)			
		};

		//add in a function later to handle if they are jumping
		//in on a stream
	})