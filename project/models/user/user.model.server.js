/**
 * Created by PriyaArun on 6/7/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User = mongoose.model("SwUser", UserSchema);

    var api = {
        CreateUser: CreateUser,
        FindUserById: FindUserById,
        FindUserByCredentials: FindUserByCredentials,
        DeleteUser: DeleteUser,
        UpdateUser: UpdateUser,
        FindUserByUserName: FindUserByUserName
    }
    return api;

    function FindUserByUserName(username) {
        return User.findOne({username: username});
    }

    function UpdateUser(userId, updatedUser) {
        return User
            .update({_id: userId},
                {$set:{
                    firstName : updatedUser.firstName,
                    lastName: updatedUser.lastName
                }});
    }

    function CreateUser(user) {
        return User.create(user);
    }

    function FindUserById(userId) {
       return User.findById({_id: userId});
    }
    
    function FindUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }
    
    function DeleteUser(userId) {
        return User.remove({_id : userId});
    }
};