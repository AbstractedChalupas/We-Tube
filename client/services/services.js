// <<<<<<< 74ec409484f43f9ca920decf110e7dac504c48bd
// app.factory('getVideo', function getVideo(url){

// })
// =======
angular.module('services', [])
	.factory('OAuth', function ($http) {
		var googleLogin = function (data) {
			return $http({
				method: 'POST',
				url: '/api/oauth/google',
				// right now, i have no idea what format the data is coming in
				data: data
			});
		}

		return {
			googleLogin: googleLogin
		};
	})

	.factory('getVideo', function ($window, $interval) {

		var videoDetails = function (cb) {
			$window.socket = io.connect('http://localhost:8001');
			socket.on('playerDetails', function (data) {
				console.log('socket data', data);
				cb(data);
				console.log('player', $window.youtubePlayer);

				$interval(function() {
					socket.emit('clientPlayer', {	currentTime: $window.youtubePlayer.getCurrentTime(),
																				currentState: $window.youtubePlayer.getPlayerState()
					});
				}, 1000);
			});
		};

		var setupPlayer = function() {
			var tag = document.createElement('script');
			tag.src = "https://www.youtube.com/iframe_api";
			var firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		};

		var onYoutubeStateChange = function() {
			console.log('state change!')
			socket.emit('clientPlayerStateChange', {stateChange: $window.youtubePlayer.getPlayerState()});
		};

		$window.onYouTubeIframeAPIReady=function() {
			console.log('youtube iFrame ready!');
			videoDetails(function(data) {
				$window.youtubePlayer = new YT.Player('player', {
					height: '400',
					width: '600',
					videoId: data.videoId,
					events: {
						'onStateChange': onYoutubeStateChange
					}
				});
			});
		};
		// 		player = new YT.Player('player', {
		// 	  height: '390',
		// 	  width: '640',
		// 	  videoId: 'M7lc1UVf-VE',
		// 	  events: {
		// 	    'onReady': onPlayerReady,
		// 	    'onStateChange': onPlayerStateChange
		// 	   }
		// 	 });
		// 	}
		// 	function onPlayerReady(event) {
		// 		event.target.playVideo();
		// 	}
		// 	function onPlayerStateChange(event) {
		// 		// if (event.data == YT.PlayerState.PLAYING && !done) {
		// 	 //  	setTimeout(stopVideo, 6000);
		// 	 //    done = true;
		// 	 //  }
		// 	}
		// 	function stopVideo() {
		// 		player.stopVideo();
		// 	}
		// };

		return {
			videoDetails: videoDetails,
			setupPlayer: setupPlayer
		};
	})
