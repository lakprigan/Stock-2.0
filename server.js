var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var session      = require('express-session');

//Before you use any routes, so that parsing will be available for all the routes
var bodyParser = require('body-parser');
var passport = require('passport');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());
//encrypt the user.  As the cookies are sent back and forth. Encrpts and decrypts environment
// put a environment variable in mac bash-profile and rhc in openshift

app.use(session({ secret: process.env.SESSION_SECRET,
resave: true,
saveUnitialized: true}));

//require ("./test/app.js")(app);

app.use(passport.initialize());
app.use(passport.session());

var ipaddress = process.env.OPENSHIFT_NODEJS_IP;
var port      = process.env.OPENSHIFT_NODEJS_PORT || 3000;

var mongoose = require('mongoose');
var connectionString = 'mongodb://localhost/cs5610';
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD) {
    connectionString = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
mongoose.connect(connectionString);

var assignment = require("./assignment/app.js");
assignment(app);

var project = require("./project/app.js");
project(app);

app.listen(port, ipaddress);
