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

	.factory('getVideo', function ($window, $interval) {
		var onYoutubeStateChange = function() {
			console.log('state change!')
			socket.emit('clientPlayerStateChange', {stateChange: $window.youtubePlayer.getPlayerState()});
		};

		var host= false;
		var videoId = '';

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

				//if possible make async at some point this and the above
				$window.socket = io.connect('http://localhost:8001');
				if(host){
					$interval(function() {
						socket.emit('hostPlayer', {	currentTime: $window.youtubePlayer.getCurrentTime(),
																					currentState: $window.youtubePlayer.getPlayerState()
						});
					}, 1000);
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
			};

		return {
			setupPlayer: setupPlayer,
		};
	})
