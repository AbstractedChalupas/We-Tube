app.config(function($routeProvider, $sceDelegateProvider){

	var checkLoggedin = function($q, $http, $location, $rootScope) {
       var deferred = $q.defer();

       $http.get('/api/loggedin').success(function(user) {
         if (user !== '0') {
           $rootScope.user = user;
           deferred.resolve();
         } else {
           deferred.reject();
           $location.url('/login');
         }
       });

       return deferred.promise;
     };

	$routeProvider
		.when("/stream", {
			templateUrl: "stream/stream.html",
			controller: "StreamController",
      resolve: {
         loggedin: checkLoggedin
       }
		})
		.when("/", {
			templateUrl: "auth/login.html",
			controller: "AuthController"
		})
		.otherwise({
			redirectTo: '/'
		})

	$sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    'https://www.youtube.com/**'
  ]);
})