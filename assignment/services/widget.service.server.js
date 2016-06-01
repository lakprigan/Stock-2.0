/**
 * Created by PriyaArun on 6/1/16.
 */
module.exports = function (app) {
    var Widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/page/:pageId/widget",CreateWidget);
    app.get("/api/page/:pageId/widget", FindAllWidgetsForPage);
    app.get("/api/widget/:widgetId", FindWidgetById);
    app.put("/api/widget/:widgetId", UpdateWidget);
    app.delete("/api/widget/:widgetId", DeleteWidget);
    
    function CreateWidget(req, res) {
        var widget = req.body;
        Widgets.push(widget);
        res.send(widget);
    }
    
    function FindAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;
        var result = [];
        for(var w in Widgets){
            if(Widgets[w].pageId === pageId){
                result.push(Widgets[w]);
            }
        }
        res.send(result);
    }
    
    function FindWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        for(var i in Widgets){
            if(Widgets[i]._id===widgetId){
                res.send(Widgets[i]);
                return;
            }
        }
        res.send(400);
    }
    
    function UpdateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var updatedWidget = req.body;
        for(var i in Widgets){
            if(Widgets[i]._id===widgetId){
                // Widgets[i].widgetType = updatedWidget.widgetType;
                // Widgets[i].text = updatedWidget.text;
                // Widgets[i].size = updatedWidget.size;
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
    
    function DeleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var w in Widgets){
            if(Widgets[w]._id === widgetId){
                Widgets.splice(w,1);
                res.send(200);
                return;
            }
        }
        res.send(400);
    }
};
