angular.module('stream', [])
	.controller('StreamController', function ($scope, getVideo) {
		$scope.hello = "hello I'm a stream controller";
		$scope.embed = "https://www.youtube.com/embed/";
		$scope.startTime = 120;

		$scope.submitUrl = function(url){
			url = url.split("v=")
			$scope.embed += url[1] + "?autoplay=1"
			if($scope.startTime){
				$scope.embed += "&start=" + $scope.startTime 
			}
		}
	})