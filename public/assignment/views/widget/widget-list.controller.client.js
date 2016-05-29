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
            ViewModel.Widgets = WidgetService.FindWidgetsByPageId(ViewModel.PageId);
            ViewModel.GetSafeHtml = getSafeHtml;
            ViewModel.GetSafeUrl = getSafeUrl;
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
    }
})();
