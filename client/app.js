var app = angular.module('app', ['ngRoute', 'login', 'stream', 'services']);
app.controller('appController', function($scope){
	$scope.hello = "hello"
})