var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors')
var GoogleStrategy = require('passport-google-oauth2').Strategy;

// app.use(cors);

/* GOOGLE AUTHENTICATION */

var GOOGLE_CLIENT_ID = "241499985652-hiocda659j1b9sk5tfpnjajfn04o1hqh.apps.googleusercontent.com";
var GOOGLE_CLIENT_SECRET = "FAB9lOKRaVKFgSsw0VysIj5q";


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  passReqToCallback: true
},
function (request, accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
    return done(null, profile);
  });
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(cors());




// Connect to a database called we-tube
mongoose.connect('mongodb://localhost/we-tube')
;
var PORT = 8001;

var io = require('socket.io').listen(app.listen(PORT));

app.use(express.static(__dirname+"/../client"));

io.on('connection', function (socket) {
  console.log('client connected');
  socket.emit('playerDetails', {'videoId': 'bHQqvYy5KYo',
               'startSeconds': 5,
               'endSeconds': 60,
               'suggestedQuality': 'large'});
});

app.get('/auth/google', passport.authenticate('google', { scope: [
       'https://www.googleapis.com/auth/plus.login',
       'https://www.googleapis.com/auth/plus.profile.emails.read'] 
}));

app.get( '/auth/google/callback', 
      passport.authenticate( 'google', { 
        successRedirect: '/',
        failureRedirect: '/login'
}));


module.exports = app;