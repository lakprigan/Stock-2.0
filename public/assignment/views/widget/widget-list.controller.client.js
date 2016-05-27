/**
 * Created by PriyaArun on 5/27/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($routeParams, WidgetService) {
        var ViewModel = this;
        Initialize();
        function Initialize() {
            ViewModel.PageId = $routeParams.pid;
            ViewModel.UserId = $routeParams.uid;
            ViewModel.Widgets = WidgetService.FindWidgtesForPageId(ViewModel.PageId);
       }
    }
})();
