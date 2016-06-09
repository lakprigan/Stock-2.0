/**
 * Created by PriyaArun on 6/1/16.
 */
module.exports = function(app, models){

    var websiteModel = models.WebsiteModel;
    var Websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];
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
        // Websites.push(website);
        // res.send(website);
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
        // var result = [];
        // for(var w in Websites){
        //     if(Websites[w].developerId === userId){
        //         result.push(Websites[w]);
        //     }
        // }
        // res.send(result);
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
        // for(var w in Websites){
        //  if(Websites[w]._id===websiteId){
        //      res.send(Websites[w]);
        //      return;
        //  }
        // }
        // res.send(400);
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
        // for(var i in Websites){
        //  if(Websites[i]._id===id){
        //      Websites[i].name = newWebsite.name;
        //      res.send(200);
        //      return;
        //  }
        // }
        // res.send(400);
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
        // for(var i in Websites){
        //     if(Websites[i]._id === id){
        //         Websites.splice(i,1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }
}
