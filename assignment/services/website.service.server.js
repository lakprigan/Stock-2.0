/**
 * Created by PriyaArun on 6/1/16.
 */
module.exports = function(app, models){

    var websiteModel = models.WebsiteModel;
    app.post("/api/user/:userId/website",CreateWebsite);
    app.get("/api/user/:userId/website", FindAllWebsitesForUser);
    app.get("/api/website/:websiteId",FindWebsiteById);
    app.put("/api/website/:websiteId", UpdateWebsite);
    app.delete("/api/website/:websiteId", DeleteWebsite);

    function CreateWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        websiteModel
            .CreateWebsite(userId, website)
            .then(function (stats) {
                res.send(200);
            },function (err) {
                res.statusCode(400).send(err);
            });
    }

    function FindAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        websiteModel
            .FindAllWebsitesForUser(userId)
            .then(function (webistes) {
                res.json(webistes);
            },function (err) {
                res.statusCode(400).send(err);
            })
    }

    function FindWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        websiteModel
            .FindWebsiteById(websiteId)
            .then(function (website) {
                res.json(website);
            },function (err){
                res.statusCode(400).send(err);
            });
    }

    function UpdateWebsite(req, res) {
        var id = req.params.websiteId;
        var newWebsite = req.body;
        websiteModel
            .UpdateWebsite(id, newWebsite)
            .then(function (stats) {
                res.send(200);
            },function (err) {
                res.statusCode(404).send(err);
            });
    }

    function DeleteWebsite(req, res) {
        var id = req.params.websiteId;
        websiteModel
            .DeleteWebsite(id)
            .then(function (stats) {
                res.send(200);
            },function (err) {
                res.statusCode(404).send(err);
            })
    }
}
