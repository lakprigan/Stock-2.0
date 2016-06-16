/**
 * Created by PriyaArun on 6/1/16.
 */
module.exports = function (app, models) {
    var pageModel = models.PageModel;

    app.post("/api/website/:websiteId/page",CreatePage);
    app.get("/api/website/:websiteId/page", FindAllPageForWebsite);
    app.get("/api/page/:pageId",FindPageById);
    app.put("/api/page/:pageId", UpdatePage);
    app.delete("/api/page/:pageId", DeletePage);

    function CreatePage(req, res) {
        var page = req.body;
        var websiteId =req.params.websiteId;
        pageModel
            .CreatePage(websiteId,page)
            .then(function (stats) {
                res.send(200);
            },function (err) {
                res.statusCode(400).send(err);
            });
    }

    function FindAllPageForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        pageModel
            .FindAllPageForWebsite(websiteId)
            .then(function (pages) {
                res.json(pages);
            },function (err) {
                res.statusCode(404).send(err);
            });
    }

    function FindPageById(req, res) {
        var pageId = req.params.pageId;
        pageModel.FindPageById(pageId)
            .then(function (page) {
                res.json(page);
            },function () {
                res.statusCode(400).send(err);
            });
        
    }

    function UpdatePage(req, res) {
        var id = req.params.pageId
        var newPage = req.body;

        pageModel.UpdatePage(id, newPage)
            .then(function (stat) {
                res.send(200);
            },function (err) {
                res.statusCode(404).send(err);
            });
       }

    function DeletePage(req, res) {
        var id = req.params.pageId;
        pageModel.DeletePage(id)
            .then(function (stat) {
                res.send(200);
            },function (err) {
                res.statusCode(404).send(err);
            });
     }

};
