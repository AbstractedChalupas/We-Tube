app.controller('streamController', function($scope){
	$scope.hello = "hello I'm a stream controller"
	$scope.embed = "https://www.youtube.com/embed/"
	$scope.submitUrl = function(url){
		url = url.split("v=")
		$scope.embed += url[1]
	}
	// $scope.isURL = true;
	// https://www.youtube.com/watch?v=KehZYh0a6lk
	// "https://www.youtube.com/embed/KehZYh0a6lk"
	// $scope.URL = function(){
	// 	$scope.isURL = false;
	// }
})