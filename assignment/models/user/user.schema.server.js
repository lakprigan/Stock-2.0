/**
 * Created by PriyaArun on 6/7/16.
 */
module.exports = function () {
  var mongoose = require("mongoose");
    //mongodb has no notion of schema ,, this is at the application level
     var UserSchema = mongoose.Schema({
         username : String,
         password : String,
         firstName : String,
         lastName : String,
         email : String,
         facebook:{
             id: String,
             token: String,
             displayName: String
         },
         websites : [{type:mongoose.Schema.Types.ObjectId, ref: 'Website'}],
         dob: Date,
         phone : String,
        dateCreated : {type: Date, default: Date.Now}
    },{collection: "wam.user"});
  return UserSchema;  
};