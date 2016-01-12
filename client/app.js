//barebones module, all controll is in the factory and stream controller
var app = angular.module('app', ['ngRoute', 'login', 'stream', 'services', 'ngMaterial']);
app.controller('appController', function($scope){
	$scope.hello = "hello"
})