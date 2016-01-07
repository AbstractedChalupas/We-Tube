app.config(function($routeProvider, $sceDelegateProvider){
	$routeProvider
		.when("/stream", {
			templateUrl: "stream/stream.html",
			controller: "StreamController"
		})
		.when("/login", {
			templateUrl: "auth/login.html",
			controller: "AuthController"
		})

	$sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://www.youtube.com/**'
  ]);
})