/**
 * Created by PriyaArun on 6/7/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server");
    var User = mongoose.model("User", UserSchema);

    var api = {
        CreateUser: CreateUser,
        FindUserById: FindUserById,
        FindUserByCredentials: FindUserByCredentials,
        DeleteUser: DeleteUser,
        UpdateUser: UpdateUser,
        FindUserByUserName: FindUserByUserName
    }
    return api;

    function FindUserByUserName(userName) {
        return User.findOne({userName: username});
    }

    function UpdateUser(userId, updatedUser) {
        return User
            .update({_id: userId},
                {$set:{
                    firstName : firstName,
                    lastName: lastName
                }});
    }

    function CreateUser(user) {
        console.log("createUser" + user);
        User.create(user);
    }

    function FindUserById(userId) {
       return User.findById({_id: userId});
    }
    
    function FindUserByCredentials() {
        return User.findOne({username: username, password: password});
    }
    
    function DeleteUser(userId) {
        return User.remove({_id : userId});
    }
};