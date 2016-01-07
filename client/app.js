var app = angular.module('app', ['ngRoute'])
app.controller('appController', function($scope){
	$scope.hello = "hello"

  var socket = io.connect('http://localhost:8001');
  //console.log(socket);
  socket.on('playerDetails', function (data) {
    console.log(data);
    //socket.emit('my other event', { my: 'data' });
  });
})