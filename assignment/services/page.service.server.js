/**
 * Created by PriyaArun on 6/1/16.
 */
module.exports = function (app) {
    var Pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];
    app.post("/api/website/:websiteId/page",CreatePage);
    app.get("/api/website/:websiteId/page", FindAllPageForWebsite);
    app.get("/api/page/:pageId",FindPageById);
    app.put("/api/page/:pageId", UpdatePage);
    app.delete("/api/page/:pageId", DeletePage);

    function CreatePage(req, res) {
        var page = req.body;
        Pages.push(page);
        res.send(page);
    }

    function FindAllPageForWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var result = [];
        for(var p in Pages){
            if(Pages[p].websiteId === websiteId){
                result.push(Pages[p]);
            }
        }
        res.send(result);
    }

    function FindPageById(req, res) {
        var pageId = req.params.pageId;
        for(var p in Pages){
            if(Pages[p]._id===pageId){
                res.send(Pages[p]);
                return;
            }
        }
        res.send(400);
    }

    function UpdatePage(req, res) {
        var id = req.params.pageId
        var newPage = req.body;
        for(var p in Pages){
            if(Pages[p]._id===id){
                Pages[p].name = newPage.name;
                Pages[p].title = newPage.title;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

    function DeletePage(req, res) {
        var id = req.params.pageId;
        for(var p in Pages){
            if(Pages[p]._id === id){
                Pages.splice(p,1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }

};
