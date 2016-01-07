var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// Connect to a database called we-tube
mongoose.connect('mongodb://localhost/we-tube');


var PORT = 8001;


app.use(express.static(__dirname+"/../client"));


app.listen(PORT);

module.exports = app;