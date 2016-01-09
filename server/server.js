var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var passport = require('passport');


// "1082022701969-rdl6108k798kf2apth302dcuornld9pg.apps.googleusercontent.com"

/* GOOGLE AUTHENTICATION */

var GOOGLE_CLIENT_ID = "1082022701969-rdl6108k798kf2apth302dcuornld9pg";
var GOOGLE_CLIENT_SECRET = "rf5SxZAdcpha9sNXcN-QD3uq";

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:8001/auth/google/callback",
  passReqtoCallback: true
},
function (request, accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
    console.log(profile);
    return done(null, profile);
  });
}
));
app.use(cors());

app.use( passport.initialize());
app.use( passport.session());




// Connect to a database called we-tube
mongoose.connect('mongodb://localhost/we-tube')
;
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
    socket.broadcast.emit('serverStateChange', data.stateChange);
  });
});

app.get('/auth/google', passport.authenticate('google', {scope: [
        'https://www.googleapis.com/auth/plus.login',
        'https://www.googleapis.com/auth/plus.profile.emails.read']
}));


app.get('/auth/google/callback',
        passport.authenticate( 'google', {
          successRedirect: '/successRedirect',
          failureRedirect: '/login'
}));




module.exports = app;