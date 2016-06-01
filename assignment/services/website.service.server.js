/**
 * Created by PriyaArun on 6/1/16.
 */
module.exports = function(app){
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

    function CreateWebsite() {
        var website = req.body;
        Websites.push(user);
        res.send(website);
    }

    function FindAllWebsitesForUser(req, res) {
        var userId = req.params.userId;
        var result = [];
        for(var w in Websites){
            if(Websites[w].developerId === userId){
                result.push(Websites[w]);
            }
        }
        res.send(result);
    }

    function FindWebsiteById() {

    }

    function UpdateWebsite() {

    }

    function DeleteWebsite() {

    }
}
