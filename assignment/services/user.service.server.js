/**
 * Created by PriyaArun on 5/31/16.
 */
module.exports = function(app, models){

    var passport = require('passport');
    var LocalStrategy = require('passport-local').Strategy;
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var userModel = models.UserModel;

    //encrypt entire request to the body using ssl - openshift paid version supports this
    app.post("/api/user",createUser);
    //intercept login, filter or middle tier that can take a look into the request
    //local is the standard name for the local strategy
    app.post("/api/login",passport.authenticate('wam'), login);
    app.post("/api/logout", logout);
    app.get("/api/user", GetUsers);
    app.get("/api/user/:userId", FindUserById);
    app.put("/api/user/:userId", UpdateUser);
    app.delete("/api/user/:userId", DeleteUser);

    function logout(req, res) {
        req.logout();
        res.send(200);
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

    //subsequent request headers cookies will be passed along to the server
    //by default the session timeout is 30 mins
    //restart server session goes away
    //any falsey, abort the request 401/404 and abort the session
    passport.use('wam', new LocalStrategy(localStrategy));
    function localStrategy(username, password, done) {
        userModel
            .FindUserByCredentials(username, password)
            .then(
                function(user) {
                    if(user.username === username && user.password === password) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                },
                function(err) {
                    return done(err);
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