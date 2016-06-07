/**
 * Created by PriyaArun on 6/7/16.
 */
module.exports = function () {
  var mongoose = require("mongoose");
    //mongodb has no notion of schema ,, this is at the application level
     var UserSchema = mongoose.Schema({
        userName : {type : String, required : true, unique : true},
        password : String,
        firstName : String,
        lastName : String,
        dob: Date,
        dateCreated : {type: Date, default: Date.Now}
    },{collection: "wam.user"});
  return UserSchema;  
};