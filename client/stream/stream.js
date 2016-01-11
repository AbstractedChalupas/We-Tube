angular.module('stream', [])
<<<<<<< HEAD
	.controller('StreamController', function ($scope, getVideo, $http) {
		$scope.hello = "hello I'm a stream controller";
=======
	.controller('StreamController', function ($scope, getVideo) {
>>>>>>> got messages to transfer, strange error on viewer side where they don't load new messages untill they start to type
		$scope.videoId = "";
		$scope.startTime = 120;
		$scope.messages = [];
		// [{user:"Bob", message: "hello"}]

		$scope.clearUrl = function(){
			$scope.url = ''
		}

		$scope.submitUrl = function(url){
			url = url.split("v=")
			//grabs the youtube video id
			$scope.videoId += url[1] 
			//pass in true since they are the host
			getVideo.setupPlayer($scope.videoId, true)			
			$scope.user = "Bob"
			$scope.messages = getVideo.messages;
		};
		$scope.logout = function() {
			return $http({
				method: "GET",
				url:'/api/logout'
			});
		}

		$scope.joinStream = function(videoId){
			//pass in false since they are a viewer
			getVideo.setupPlayer(videoId, false)
			$scope.user = "Not Bob"
			$scope.messages = getVideo.messages;
		}

		$scope.submitMessage = function(keyCode){
			if(keyCode === 13){
				getVideo.submitMessage($scope.user, $scope.message)
				// ({user: $scope.user, message:$scope.message})
				$scope.message = ""
			}					
		}
	})