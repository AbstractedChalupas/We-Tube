var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');
var GoogleStrategy = require('passport-google-oauth2').Strategy;
var passport = require('passport');
var session = require('express-session')
var User = require('../DB/users/userModel')

app.use(session({secret: "nyan", cookie: {}, resave: false, saveUninitialized: false }));


// "1082022701969-rdl6108k798kf2apth302dcuornld9pg.apps.googleusercontent.com"

/* GOOGLE AUTHENTICATION */

var GOOGLE_CLIENT_ID = "1082022701969-rdl6108k798kf2apth302dcuornld9pg";
var GOOGLE_CLIENT_SECRET = "rf5SxZAdcpha9sNXcN-QD3uq";


// identify which property defines user. this is the users google id which is a number
passport.serializeUser(function(user, done) {
  done(null, user.id);
});


//find using one proprety in the schema 
passport.deserializeUser(function(obj, done) {
  // var userRecord = mongoose query for user based on obj
  // if error, then call done(err);
  //obj should be the user record plucked from database
  User.findOne({'id': obj},function (err, record) {
    if (err) {
      return err;
    }
    return done(null, record);
  })
});

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:8001/auth/google/callback",
  passReqtoCallback: true
},
function (request, accessToken, refreshToken, profile, done) {
  process.nextTick(function() {
    console.log(profile.id)
    // check for users in database here, if the database doesnt have that user, add them as a usermodel in mongo
    User.findOne({'id':profile.id}, function (err, record){
      if (err){
        return err;
      }
      // if the record exists and is found, return it
      if (record) {
        return done(null, record); 
      }
      else {
        record = {'id': profile.id, 'username': profile.name.givenName}
        User.create(record, function (err, record) {
          if (err) {
            throw err;
          }
          return done(null, record);
        })
      }
    });
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
  // socket.emit('playerDetails', {'videoId': 'TRrL5j3MIvo',
  //              'startSeconds': 5,
  //              'endSeconds': 60,
  //              'suggestedQuality': 'large'});
  socket.emit('playerDetails', {'videoId': 'TRrL5j3MIvo',
             'startSeconds': 5,
             'endSeconds': 60,
             'suggestedQuality': 'large'});
  
  socket.on('hostPlayer', function (data) {
    console.log(data);
    socket.broadcast.emit('hostPlayerSync', data)
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
          successRedirect: '/',
          failureRedirect: '/login'
}));

var checkUser = function (req, res, next) {
  if (req.isAuthenticated()){
    next();
  }
  else {
    res.redirect('/#login');
  }
};


module.exports = app;