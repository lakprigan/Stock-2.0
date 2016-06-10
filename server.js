var express = require('express');
var app = express();

//Before you use any routes, so that parsing will be available for all the routes
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

//require ("./test/app.js")(app);

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cs5610');

var assignment = require("./assignment/app.js");
assignment(app);

var project = require("./project/app.js");
project(app);

app.listen(port, ipaddress);
