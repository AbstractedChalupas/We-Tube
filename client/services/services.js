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
		//listens for when the video state changes
		var onYoutubeStateChange = function() {
			console.log('state change!')
			//emits any state change through socket io to the server
			socket.emit('clientPlayerStateChange', {
				stateChange: $window.youtubePlayer.getPlayerState(),
				room: videoId
			});
			//only the host emmits the current time for the others to sync to
			if(host){
				socket.emit('hostPlayerState',
				{
					currentTime: $window.youtubePlayer.getCurrentTime(),
					currentState: $window.youtubePlayer.getPlayerState(),
					room : videoId
				});
			}
		};
		//initial values to be modified later
		var host = false; 
		var videoId = '';
		var messages = [];

		//at the end of setupPlayer onYouTubeIframeAPIReady is automatically called
		var setupPlayer = function(source, isHost) {
			//update these here because they cannot be passed directly into 
			//onYouTubeIframeAPIReady
			videoId = source
			host = isHost;

			// add the ifram api
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
					'onStateChange': onYoutubeStateChange,
					'onReady' : submitRoom
				}
			});
		}

			//sets up the socket stream and events
		var submitRoom = function(){
			$window.socket = io.connect('http://localhost:8001');
			//sets up the host events and the new room
			if(host){
				var videoTitle = $window.youtubePlayer.getVideoData().title
				socket.emit('createRoom',{room : videoId, roomTitle : videoTitle});
				//gets a new viewer to sync to the current state
				socket.on('newViewer', function(data){
					if($window.youtubePlayer.getCurrentTime() > 0)
					socket.emit('hostPlayerState',
					{
						currentTime: $window.youtubePlayer.getCurrentTime(),
						currentState: $window.youtubePlayer.getPlayerState(),
						room : videoId
					});
				})
			}

			//makes the viewers synch to the host whenever the host emits a time event
			//recieves this event from the server when the server hears the hostPlayerState
			//even
			if(!host){
				socket.emit ('joinRoom', {room: videoId});

				socket.on("hostPlayerSync", function(data){
					console.log(data, "hostPlayerSync -- viewer")
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
				//adds to the front of the messages
				messages.unshift({user : data.user, message : data.message, "userImage" : data.userImage})
				//force the scope to update, solved a strange error where
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
