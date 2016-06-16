/**
 * Created by PriyaArun on 6/1/16.
 */
module.exports = function (app, models) {
    var widgetModel = models.WidgetModel;
    var multer = require('multer'); // npm install multer --save
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    app.post("/api/page/:pageId/widget", CreateWidget);
    app.get("/api/page/:pageId/widget", FindAllWidgetsForPage);
    app.get("/api/widget/:widgetId", FindWidgetById);
    app.put("/api/widget/:widgetId", UpdateWidget);
    app.delete("/api/widget/:widgetId", DeleteWidget);
    app.post("/api/uploads", upload.single('myFile'), uploadImage);
    app.put("/api/page/:pageId/widget", ReorderWidgets);

    function uploadImage(req, res) {
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var pageId = req.body.pageId;
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var myFile = req.file;

        if (myFile != null) {
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
        else {
            res.redirect("/assignment/index.html#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
        }
    }

    function ReorderWidgets(req, res) {
        var pageId = req.params.pageId;
        var startIndex = req.query['start'];
        var endIndex = req.query['end'];

        widgetModel
            .ReorderWidgets(pageId, startIndex, endIndex)
            .then(function (res) {
                res.send(200);
            }, function (err) {
                res.statusCode(404).send(err);
            });
    }

    function CreateWidget(req, res) {
        var widget = req.body;
        var pageId = req.params.pageId;
        widgetModel
            .CreateWidget(pageId, widget)
            .then(function (stat) {
                res.send(stat._id);
            }, function (err) {
                res.statusCode(404).send(err);
            });
    }

    function FindAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .FindAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (err) {
                res.statusCode(404).send(err);
            });
    }

    function FindWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .FindWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (err) {
                res.statusCode(400).send(err);
            });
    }

    function UpdateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var updatedWidget = req.body;
        widgetModel
            .UpdateWidget(widgetId, updatedWidget)
            .then(function (widget) {
                res.send(200);
            }, function (err) {
                res.statusCode(400).send(err);
            });
    }

    function DeleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .DeleteWidget(widgetId)
            .then(function (widget) {
                res.send(200);
            }, function (err) {
                res.statusCode(400).send(err);
            });
    }
};
