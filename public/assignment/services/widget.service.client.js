/**
 * Created by PriyaArun on 5/27/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);

    var Widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%", "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%", "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];


    function WidgetService() {
        var api = {
            FindWidgetsByPageId : FindWidgetsByPageId,
            CreateWidget: CreateWidget,
            FindWidgetById: FindWidgetById,
            UpdateWidget: UpdateWidget,
            DeleteWidget: DeleteWidget
        };
        return api;

        function FindWidgetsByPageId(pageId) {
            var resultSet = [];
            for(var i in Widgets){
                if(Widgets[i].pageId === pageId){
                    resultSet.push(Widgets[i]);
                }
            }
            return resultSet;
        }

        function FindWidgetById(widgetId) {
            for(var i in Widgets){
                if(Widgets[i]._id === widgetId){
                    return Widgets[i];
                }
            }
            return null;
        }

        function UpdateWidget(widgetId, updatedWidget) {
            for(var i in Widgets){
                if(Widgets[i]._id === widgetId){
                    Widgets[i].widgetType = updatedWidget.widgetType;
                    Widgets[i].text = updatedWidget.text;
                    Widgets[i].size = updatedWidget.size;
                    return true
                }
            }
            return false;
        }

        function CreateWidget(newWidget) {
            Widgets.push(newWidget);
            return newWidget;
        }

        function DeleteWidget(widgetId) {
            for(var i in Widgets){
                if(Widgets[i]._id === widgetId){
                    Widgets.splice(i,1);
                    return true;
                }
            }
            return false;
        }
    }
})();
