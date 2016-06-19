/**
 * Created by PriyaArun on 6/7/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");

    var UserSchema = require("./user.schema.server")();

    var User = mongoose.model("swUser", UserSchema);

    var api = {
        CreateUser: CreateUser,
        FindUserById: FindUserById,
        FindUserByCredentials: FindUserByCredentials,
        DeleteUser: DeleteUser,
        UpdateUser: UpdateUser,
        FindUserByUserName: FindUserByUserName,
        FindFacebookUser: FindFacebookUser,
        GetExperts: GetExperts
    }

    return api;

    function GetExperts() {
    return User.find({"type" : "expert"});
    }

    function FindFacebookUser(id) {
        return User.findOne({"facebook.id": id});
    }

    function FindUserByUserName(username) {
        return User.findOne({username: username});
    }

    function UpdateUser(userId, updatedUser) {
        return User
            .update({_id: userId},
                {$set:{
                    firstName : updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    type: updatedUser.type,
                    circle: updatedUser.circle
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