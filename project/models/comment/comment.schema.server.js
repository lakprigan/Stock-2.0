/**
 * Created by PriyaArun on 6/9/16.
 */
module.exports=function () {
    var mongoose = require("mongoose");
    var CommentSchema = mongoose.Schema({
        username : String,
        post : String,
        dateCreated : {type: Date, default: Date.Now}
    }, {collection: 'sw.comment'});
    return CommentSchema;
}