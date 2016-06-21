/**
 * Created by PriyaArun on 6/19/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var CommentSchema = require("./comment.schema.server.js")();
    var Comment = mongoose.model("Comment", CommentSchema);

    var api = {
        CreateComment: CreateComment,
        FindCommentsByStockCode: FindCommentsByStockCode,
        DeleteCommentById: DeleteCommentById,
    }

    return api;

    function CreateComment(comment) {
        return Comment
            .create(comment);
    }

    function FindCommentsByStockCode(stockCode) {
        return Comment
            .find({"code": stockCode});
    }

    function DeleteCommentById(commentId) {
        return Comment
            .remove({"_id": commentId});
    }

}
