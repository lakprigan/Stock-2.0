/**
 * Created by PriyaArun on 5/31/16.
 */
module.exports = function(app, models){
    var Users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];
    var userModel = models.UserModel;

    app.post("/api/user",createUser);
    app.get("/api/user", GetUsers);
    app.get("/api/user/:userId", FindUserById);
    app.put("/api/user/:userId", UpdateUser);
    app.delete("/api/user/:userId", DeleteUser);

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
            FindUserByCredentials(username, password, res)
        }
        else if(username){
            FindUserByUserName(username,res);
        }
        else{
            res.send(Users);
        }
    }

    function FindUserByCredentials(username, password, res) {
        userModel
            .FindUserByCredentials(username,password)
            .then(function (user) {
                res.json(user)
            },function (err) {
                res.statusCode(400).send(err);
            });
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