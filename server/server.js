var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// Connect to a database called we-tube
mongoose.connect('mongodb://localhost/we-tube');

var PORT = 8001;

var io = require('socket.io').listen(app.listen(PORT));

app.use(express.static(__dirname+"/../client"));

io.on('connection', function (socket) {
  var connectedClients = [];
  connectedClients.push(socket);
  //console.log('client connected', connectedClients);
  socket.emit('playerDetails', {'videoId': 'TRrL5j3MIvo',
               'startSeconds': 5,
               'endSeconds': 60,
               'suggestedQuality': 'large'});
  socket.on('clientPlayer', function (data) {
    console.log(data);
  });
  socket.on('clientPlayerStateChange', function(data) {
    console.log('client changed state!, server broadcast', data.stateChange);
    io.emit('serverStateChange', data.stateChange);
  });
});

app.post('/api/oauth/google', function (req, res) {
	console.log('reached the server');
  res.end('HELLO WORLD')
})


module.exports = app;