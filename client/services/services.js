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


		var host = false;
		var videoId = '';
		var messages = [];

		//at the end of setupPlayer onYouTubeIframeAPIReady is automatically called
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
					//calls onYoutubeStateChange when it recieves a 
					//state change from the server
					'onStateChange': onYoutubeStateChange
				}
			});

			//sets up the socket stream and events
			$window.socket = io.connect('http://localhost:8001');
			if(host){
				socket.emit('createRoom',{room : videoId});
			}
		};

		var onYoutubeStateChange = function() {
			console.log('state change!')

			socket.emit('clientPlayerStateChange', {
				stateChange: $window.youtubePlayer.getPlayerState(),
				room: videoId
			});

			if(host){
				socket.emit('hostPlayerState',
				{
					currentTime: $window.youtubePlayer.getCurrentTime(),
					currentState: $window.youtubePlayer.getPlayerState(),
					room : videoId
				});
			}
			//makes the viewers synch to the host whenever the host emits a time event
			//recieves this event from the server when the server hears the hostPlayerState
			//even
			if(!host){
				socket.emit ('joinRoom', {room: videoId});

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
				messages.unshift({user : data.user, message : data.message, "userImage" : data.userImage})
				// force the scope to update, solved a strange error where
				//viewer messages weren't updating
				$rootScope.$apply()
				console.log($rootScope.user)
			});
		};

		//submits the message through socket IO whenever one is made
		$window.submitMessage = function(user, message){
			console.log("Message submitted")
			//grabs the username from Google account
			var username = $rootScope.user.username
			var userImage = $rootScope.user.photo
			//since our socket only currently sends to people who did
			//not brodcast we need to add the message to our messages array
			// messages.unshift({"user" : username, "message" : message, "userImage" : userImage})

			socket.emit('newMessage', {
				"user" : username,
				"message" : message,
				"userImage" : userImage,
				"room": videoId
			});
		}


		return {
			setupPlayer: setupPlayer,
			submitMessage : submitMessage,
			messages : messages
		};
	})
