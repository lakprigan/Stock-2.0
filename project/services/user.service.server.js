/**
 * Created by PriyaArun on 5/31/16.
 */
module.exports = function(app, models){

    var userModel = models.UserModel;

    app.post("/api/stockwatch/user",createUser);
    app.get("/api/stockwatch/user", GetUsers);
    app.get("/api/stockwatch/user/:userId", FindUserById);
    app.put("/api/stockwatch/user/:userId", UpdateUser);
    app.delete("/api/stockwatch/user/:userId", DeleteUser);

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