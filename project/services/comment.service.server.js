/**
 * Created by PriyaArun on 6/19/16.
 */
module.exports = function(app, models){

    var commentModel = models.CommentModel;
    app.post("/api/stockwatch/comment", CreateComment);
    app.get("/api/stockwatch/comment/:stockCode", FindCommentsByStockCode);
    app.delete("/api/stockwatch/comment/:id", DeleteCommentById);

    function CreateComment(req, res) {
        var comment = req.body;
        commentModel
            .CreateComment(comment)
            .then(function (stats) {
                res.send(200);
            },function (err) {
                res.statusCode(400).send(err);
            });
    }

    function FindCommentsByStockCode(req, res) {
        var stockCode = req.params.stockCode;
        commentModel
            .FindCommentsByStockCode(stockCode)
            .then(function (comments) {
                res.json(comments);
            },function (err) {
                res.statusCode(400).send(err);
            })
    }

    function DeleteCommentById(req, res) {
        var id = req.params.id;
        commentModel
            .DeleteCommentById(id)
            .then(function (stats) {
                res.send(200);
            },function (err) {
                res.statusCode(404).send(err);
            })
    }
}
