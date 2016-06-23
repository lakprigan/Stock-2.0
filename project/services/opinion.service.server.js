/**
 * Created by PriyaArun on 6/21/16.
 */
module.exports = function(app, models){

    var opinionModel = models.OpinionModel;
    app.post("/api/stockwatch/user/:userId/opinion", CreateOpinion);
    app.get("/api/stockwatch/opinion", FindAllOpinions);
    app.get("/api/stockwatch/opinion/:opinionId",FindOpinionById);
     app.put("/api/stockwatch/opinion/:opinionId", UpdateOpinion);
     app.delete("/api/stockwatch/opinion/:opinionId", DeleteOpinion);

    function CreateOpinion(req, res) {
        var opinion = req.body;
        opinionModel
            .CreateOpinion(opinion)
            .then(function (stats) {
                res.send(200);
            },function (err) {
                res.statusCode(400).send(err);
            });
    }

    function FindAllOpinions(req, res) {
        opinionModel
            .FindAllOpinions()
            .then(function (opinions) {
                res.json(opinions);
            },function (err) {
                res.statusCode(400).send(err);
            })
    }

    function FindOpinionById(req, res) {
        var opinionId = req.params.opinionId;
        opinionModel
            .FindOpinionById(opinionId)
            .then(function (opinion) {
                res.json(opinion);
            },function (err){
                res.statusCode(400).send(err);
            });
    }

    function UpdateOpinion(req, res) {
        var id = req.params.opinionId;
        var opinion = req.body;
        opinionModel
            .UpdateOpinion(id, opinion)
            .then(function (stats) {
                res.send(200);
            },function (err) {
                res.statusCode(404).send(err);
            });
    }

    function DeleteOpinion(req, res) {
        var id = req.params.opinionId;
        opinionModel
            .DeleteOpinion(id)
            .then(function (stats) {
                res.send(200);
            },function (err) {
                res.statusCode(404).send(err);
            })
    }
}
