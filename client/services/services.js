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
			socket.on('serverChangeState', function(data) {
				console.log('server changed my state', data.currentState);
				if (data.currentState === 2) {
					$window.youtubePlayer.pauseVideo();
				}
				if (data.currentState === 1) {
					$window.youtubePlayer.playVideo();
			}
				//$window.youtubePlayer.setPlayerState(data.currentState);
			})
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

		return {
			videoDetails: videoDetails,
			setupPlayer: setupPlayer
		};
	})
