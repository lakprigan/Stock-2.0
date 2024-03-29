/**
 * Created by PriyaArun on 5/27/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var ViewModel = this;
        Initialize();
        function Initialize() {
            ViewModel.PageId = $routeParams.pid;
            ViewModel.UserId = $routeParams.uid;
            ViewModel.WebsiteId = $routeParams.wid;
            ViewModel.GetSafeHtml = getSafeHtml;
            ViewModel.GetSafeUrl = getSafeUrl;
            ViewModel.ReorderWidgets = ReorderWidgets;
            init();

       }

        function init() {
            WidgetService
                .FindWidgetsByPageId(ViewModel.PageId)
                .then(function (res) {
                    ViewModel.Widgets = res.data;
                });
        }

        function getSafeHtml(widget) {
            return $sce.trustAsHtml(widget.text);
        }

        function getSafeUrl(widget) {
            var urlParts = widget.url.split("/");
            var id = urlParts[urlParts.length - 1];
            var url = "https://www.youtube.com/embed/"+id;
            return $sce.trustAsResourceUrl(url);
        }

        function ReorderWidgets(map) {
            console.log("here");
            WidgetService
                .ReorderWidgets(ViewModel.PageId, map.start, map.end)
                .then(init);

        }
    }
})();
