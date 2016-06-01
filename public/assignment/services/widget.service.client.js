/**
 * Created by PriyaArun on 5/27/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService",WidgetService);

    function WidgetService($http) {
        var api = {
            FindWidgetsByPageId : FindWidgetsByPageId,
            CreateWidget: CreateWidget,
            FindWidgetById: FindWidgetById,
            UpdateWidget: UpdateWidget,
            DeleteWidget: DeleteWidget
        };
        return api;

        function FindWidgetsByPageId(pageId) {
           var url = "/api/page/"+pageId+"/widget";
            return $http.get(url);
        }

        function FindWidgetById(widgetId) {
            var url = "/api/widget/"+widgetId;
            return $http.get(url);
        }

        function UpdateWidget(widgetId, updatedWidget) {
            var url = "/api/widget/"+widgetId;
            return $http.put(url, updatedWidget);
        }

        function CreateWidget(newWidget) {
         var url = "/api/page/"+newWidget.pageId+"/widget"; 
            return $http.post(url, newWidget)
        }

        function DeleteWidget(widgetId) {
           var url = "/api/widget/"+widgetId;
            return $http.delete(url);
        }
    }
})();
