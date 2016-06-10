/**
 * Created by PriyaArun on 6/9/16.
 */
module.exports=function () {
    var mongoose = require("mongoose");
    
    var UserSchema = mongoose.Schema({
        username : String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        type: {type: String, default: 'investor', enum:['investor','expert']},
        follows: [String]
    }, {collection: 'sw.user'});

    return UserSchema;
}