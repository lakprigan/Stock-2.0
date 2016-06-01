/**
 * Created by PriyaArun on 5/27/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);

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
