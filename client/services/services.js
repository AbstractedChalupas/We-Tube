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

	.factory('getVideo', function ($window, $interval, $rootScope) {
		var onYoutubeStateChange = function() {
			console.log('state change!')
			socket.emit('clientPlayerStateChange', {stateChange: $window.youtubePlayer.getPlayerState()});
		};

		var host = false;
		var videoId = '';
		var messages = [];

		var setupPlayer = function(source, isHost) {
			videoId = source
			host = isHost;
			// add source to the io stream
			
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		};
		//updated by setupPlayer b/c setupPlayer cannot directly pass into
		//onYouTubeIframeAPIReady
		
		$window.onYouTubeIframeAPIReady=function() {
			console.log('youtube iFrame ready!');
			$window.youtubePlayer = new YT.Player('player', {
				height: '400',
				width: '600',
				videoId: videoId,
				events: {
					'onStateChange': onYoutubeStateChange
				}
			});

			//sets up the socket stream and events
			$window.socket = io.connect('http://localhost:8001');
			if(host){
				
				socket.emit('createRoom',{room : videoId})

				$interval(function() {
					//emits an event to the server
					socket.emit('hostPlayerState', {	currentTime: $window.youtubePlayer.getCurrentTime(),
																				currentState: $window.youtubePlayer.getPlayerState()
					});
				}, 1000);
			}
		
			//makes the viewers synch to the host whenever the host emits a time event
			//recieves this event from the server when the server hears the hostPlayerState
			//even
			if(!host){
				socket.on("hostPlayerSync", function(data){
					console.log(data)
					$window.youtubePlayer.seekTo(data.currentTime)
				})
			}

			socket.on('serverStateChange', function(data) {
				console.log('server changed my state', data);
				if (data === 2) {
					$window.youtubePlayer.pauseVideo();
				}
				if (data === 1) {
					$window.youtubePlayer.playVideo();
				}
			});
			//all users should be listening for and sending messages
			socket.on('newMessage', function(data) {
				console.log("message Recieved", data)
				messages.unshift({user : data.user, message : data.message})
				$rootScope.$apply()
				console.log($rootScope.user)
			});			
		};


		$window.submitMessage = function(user, message){
			console.log("Message submitted")
			var username = $rootScope.user.username
			messages.unshift({"user" : username, "message" : message})
			socket.emit('newMessage', {"user" : username, "message" : message});
		}


		return {
			setupPlayer: setupPlayer,
			submitMessage : submitMessage,
			messages : messages,
		};
	})
