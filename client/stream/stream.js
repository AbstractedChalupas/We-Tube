angular.module('stream', [])
	.controller('StreamController', function ($scope, $http, $rootScope, getVideo) {
		$scope.videoId = "";
		$scope.startTime = 120;
		//set messages to the factory array of messages since that is where
		//they are kept updated
		$scope.messages = getVideo.messages;
		$scope.rooms = [];
		$scope.user = $rootScope.user.username


		$scope.clearUrl = function(){
			$scope.url = ''
		};

		$scope.getRooms = function(){
			// $scope.rooms = ['U0315DUM6Cg']
			console.log("getting rooms")
			$http({
				method : "GET",
				url : "/streams/rooms"
			}).then(function(rooms) {
				$scope.rooms = rooms.data
     	}, function(error) {
       console.log("Error finding rooms",error);
			});
		};

		$scope.submitUrl = function(url){
			url = url.split("v=")
			//grabs the youtube video id
			$scope.videoId += url[1] 
			//pass in true since they are the host
			getVideo.setupPlayer($scope.videoId, true)			
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
		}

		$scope.submitMessage = function(keyCode){
			if(keyCode === 13){
				getVideo.submitMessage($scope.user, $scope.message)
				// ({user: $scope.user, message:$scope.message})
				$scope.message = ""
			}					
		}
	})