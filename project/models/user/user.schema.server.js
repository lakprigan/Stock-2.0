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
        facebook:{
            id: String,
            token: String,
            displayName: String
        },
        google:{
            id: String,
            token: String,
            displayName: String
        },
        type: String,
        circle: [String]
    }, {collection: 'sw.user'});

    return UserSchema;
}