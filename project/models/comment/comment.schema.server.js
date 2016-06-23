/**
 * Created by PriyaArun on 6/9/16.
 */
module.exports=function () {
    var mongoose = require("mongoose");
    var CommentSchema = mongoose.Schema({
        code: String,
        username : String,
        post : String,
        dateCreated : {type: Date, default: Date.now()}
    }, {collection: 'sw.comment'});
    return CommentSchema;
}