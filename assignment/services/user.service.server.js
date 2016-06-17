/**
 * Created by PriyaArun on 5/31/16.
 */
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app, models){

    var userModel = models.UserModel;

    //encrypt entire request to the body using ssl - openshift paid version supports this
    app.post("/api/user",createUser);
    //intercept login, filter or middle tier that can take a look into the request
    //local is the standard name for the local strategy
    app.post("/api/login",passport.authenticate('wam'), login);
    app.get("/auth/facebook", passport.authenticate('facebook'));
    app.get("/auth/facebook/callback",
        passport.authenticate('facebook', {
            successRedirect: '/#/assignment/user',
            failureRedirect: '/#/assignment/login'
        }));
    app.post("/api/logout", Logout);
    app.get("/api/user", GetUsers);
    app.get("/api/user/:userId", FindUserById);
    app.put("/api/user/:userId", UpdateUser);
    app.delete("/api/user/:userId", DeleteUser);
    app.get("/api/loggedIn", LoggedIn);
    app.post("/api/register/", Register);

    function facebookLogin(token, refreshToken, profile, done) {
        userModel
            .FindFacebookUser(profile.id)
            .then(function (user) {
                if(user) {
                    return done(null, user);
                }
                else{
                    facebookUser = {
                        username: profile.displayName.replace(/ /g,''),
                        facebook:{
                            token: token,
                            id:profile.id,
                            displayName: profile.displayName

                        }}
                    userModel
                        .CreateUser(facebookUser)
                        .then(function (user) {
                            done(null, user);
                        });
                }});
    }


    function Logout(req, res) {
        req.logout();
        res.send(200);
    }
    //callback hell
    function Register(req, res) {
        var username = req.body.username;
        var password = req.body.password;

        userModel.FindUserByUserName(username)
            .then(function (user) {
                if(user){
                    res.status(400).send("Username already in use");
                    return;
                }
                else{
                    req.body.password = bcrypt.hashSync(req.body.password);
                    return userModel.CreateUser(req.body);
                }
            },function (err) {
                res.statusCode(400).send(err);
            })
            .then(function (user) {
                if(user){
                    req.login(user, function (err) {
                        if(err){
                            res.status(400).send(err);
                        }else{
                            res.json(user);
                        }});
    }});}

    function LoggedIn(req, res) {
        if(req.isAuthenticated()){
            res.json(req.user);
        }
        else{
            res.send('0');
        }
    }

    function DeleteUser(req, res) {
        var userId = req.params.userId;
        userModel
            .DeleteUser(userId)
            .then(function (stats) {
                res.json(200);
            },function (err) {
                res.statusCode(404).send(err);
            });
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .CreateUser(user)
            .then(function (user) {
                user.password = bcrypt.hashSync(req.body.password);
                return userModel.createUser(req.body);
                res.json(user);
            },function (err) {
                res.statusCode(400).send(err);
            });
    }
    
    function GetUsers(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        if(username && password){
            FindUserByCredentials(username, password, res, req)
        }
        else if(username){
            FindUserByUserName(username,res);
        }
        else{
            res.send(Users);
        }
    }

    var facebookConfig = {
        clientID     : process.env.FACEBOOK_CLIENT_ID,
        clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL  : process.env.FACEBOOK_CALLBACK_URL
    };

    //subsequent request headers cookies will be passed along to the server
    //by default the session timeout is 30 mins
    //restart server session goes away
    //any falsey, abort the request 401/404 and abort the session
    passport.use('wam', new LocalStrategy(localStrategy));
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookLogin));


    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function localStrategy(username, password, done) {
        userModel
            .FindUserByUserName(username)
            .then(
                function(user) {
                    if(user && bcrypt.compareSync(password, user.password)) {
                         done(null, user);
                    } else {
                         done(null, false);
                    }
                },
                function(err) {
                     done(err);
                }
            );
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .FindUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }

    function login(req, res) {
        //passport has put the user in req
        var user = req.user;
        res.json(user);
    }

    function FindUserByUserName(username,res){
        userModel
            .FindUserByUserName(username)
            .then(function (user) {
                res.send(user);
            },function (err) {
                res.statusCode(404).send(err);
            });
    }


    //we want to stay as stateless as possible, session is only going to be used for identification
    //stateless scales better
    function  FindUserById(req, res) {
     var id = req.params.userId;
        userModel
            .FindUserById(id)
            .then(function (user) {
                res.send(user);
            },function (err) {
                res.statusCode(404).send(err);
            });
    }

    function UpdateUser(req, res) {
        //delete user._id, so that older versions of mongo db wont complain
        var id = req.params.userId;
        var updatedUser = req.body;
        userModel
            .UpdateUser(id, updatedUser)
            .then(function (stats) {
                res.send(200);
            },function (err) {
                res.statusCode(404).send(err);
            });
        
    }
};