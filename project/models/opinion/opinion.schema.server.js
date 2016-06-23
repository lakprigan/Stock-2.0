/**
 * Created by PriyaArun on 6/9/16.
 */
module.exports=function () {
    var mongoose = require("mongoose");
    var UserSchema = require('../user/user.schema.server')(mongoose);
    var OpinionSchema = mongoose.Schema({
        user: UserSchema,
        code : String,
        title : String,
        text : String,
        advisedBy: String,
        adviceDate: {type: Date, default: Date.now()}
    }, {collection: 'sw.opinion'});

    return OpinionSchema;
}