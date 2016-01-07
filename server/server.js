var express = require('express');
var bodyParser = require('body-parser');
var app = express();


var PORT = 8001;


app.use(express.static(__dirname+"/../client"));


app.listen(PORT);

module.exports = app;