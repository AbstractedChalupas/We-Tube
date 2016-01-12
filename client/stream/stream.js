angular.module('stream', [])
	.controller('StreamController', function ($scope, $http, $rootScope, getVideo) {
		$scope.videoId = "";
		$scope.startTime = 120;
		//set messages to the factory array of messages since that is where
		//they are kept updated
		$scope.messages = getVideo.messages;
		$scope.rooms = [];
		//gets users from the factory, this could have likely have been done like
		//the $scope.messages 
		$scope.user = $rootScope.user.username

		//can be used to clear the url field in the submit, not currently in use
		$scope.clearUrl = function(){
			$scope.url = ''
		};

		//gets rooms from the server
		$scope.getRooms = function(){
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

		//sets the videoId from the url provided
		$scope.submitUrl = function(url){
			url = url.split("v=")
			//grabs the youtube video id
			$scope.videoId += url[1] 
			//pass in true since they are the host
			getVideo.setupPlayer($scope.videoId, true)			
		};
		//loges the user out
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
			//submits message on enter
			if(keyCode === 13){
				getVideo.submitMessage($scope.user, $scope.message)
				//resets the message field
				$scope.message = ""
			}					
		}
	})