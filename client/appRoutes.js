app.config(function($routeProvider){
	$routeProvider
		.when("/stream", {
			templateUrl: "stream/stream.html",
			controller: "streamController",
		})
})