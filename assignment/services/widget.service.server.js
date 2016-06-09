/**
 * Created by PriyaArun on 6/1/16.
 */
module.exports = function (app, models) {
    var widgetModel = models.WidgetModel;
    var Widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

    app.post("/api/page/:pageId/widget",CreateWidget);
    app.get("/api/page/:pageId/widget", FindAllWidgetsForPage);
    app.get("/api/widget/:widgetId", FindWidgetById);
    app.put("/api/widget/:widgetId", UpdateWidget);
    app.delete("/api/widget/:widgetId", DeleteWidget);
    app.post ("/api/uploads", upload.single('myFile'), uploadImage);
    
    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var pageId        = req.body.pageId;
        var userId        = req.body.userId;
        var websiteId     = req.body.websiteId;
        var myFile        = req.file;

        if(myFile != null) {
            var originalname = myFile.originalname; // file name on user's computer
            var filename = myFile.filename;     // new file name in upload folder
            var path = myFile.path;         // full path of uploaded file
            var destination = myFile.destination;  // folder where file is saved to
            var size = myFile.size;
            var mimetype = myFile.mimetype;

            for (var i in Widgets) {
                if (Widgets[i]._id === widgetId) {
                    Widgets[i].url = "/uploads/" + filename;
                }
            }
            res.redirect("/assignment/index.html#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
        }
        else{
            res.redirect("/assignment/index.html#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
        }
    }

    function CreateWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;
        // Widgets.push(widget);
        // res.send(widget);
        widgetModel
            .CreateWidget(pageId, widget)
            .then(function (stat) {
                res.send(200);
            },function (err) {
                res.statusCode(404).send(err);
            });
    }
    
    function FindAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .FindAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            },function (err) {
                res.statusCode(404).send(err);
            })
        // var result = [];
        // for(var w in Widgets){
        //     if(Widgets[w].pageId === pageId){
        //         result.push(Widgets[w]);
        //     }
        // }
        // res.send(result);
    }
    
    function FindWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .FindWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            },function (err) {
                res.statusCode(400).send(err);
            });
        // for(var i in Widgets){
        //     if(Widgets[i]._id===widgetId){
        //         res.send(Widgets[i]);
        //         return;
        //     }
        // }
        // res.send(404).send("unable to find the widget");
    }
    
    function UpdateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var updatedWidget = req.body;
        widgetModel
            .UpdateWidget(widgetId,updatedWidget)
            .then(function (widget) {
                res.send(200);
            },function (err) {
                res.statusCode(400).send(err);
            });
        // for(var i in Widgets){
        //     if(Widgets[i]._id===widgetId){
        //          Widgets[i] = updatedWidget;
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }
    
    function DeleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .DeleteWidget(widgetId)
            .then(function (widget) {
                res.send(200);
            },function (err) {
                res.statusCode(400).send(err);
            });
        // for(var w in Widgets){
        //     if(Widgets[w]._id === widgetId){
        //         Widgets.splice(w,1);
        //         res.send(200);
        //         return;
        //     }
        // }
        // res.send(400);
    }
};
