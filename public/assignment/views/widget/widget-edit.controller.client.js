/**
 * Created by PriyaArun on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);

    function WidgetEditController($location, $routeParams, WidgetService) {
        var ViewModel = this;
        Initialize();
        function Initialize() {
            ViewModel.PageId = $routeParams.pid;
            ViewModel.UserId = $routeParams.uid;
            ViewModel.WebsiteId = $routeParams.wid;
            ViewModel.WidgetId = $routeParams.wgid;
            WidgetService
                .FindWidgetById(ViewModel.WidgetId)
                .then(function (res) {
                    ViewModel.Widget  = res.data;
                });
            ViewModel.WidgetSizes = [1, 2, 3, 4, 5, 6];
            ViewModel.UpdateWidget = UpdateWidget;
            ViewModel.DeleteWidget = DeleteWidget;
            ViewModel.SubmittedClass = "";

        }
        
        function UpdateWidget(Widget) {
            ViewModel.SubmittedClass = "submitted";
            if((Widget.widgetType == "HEADER" || Widget.widgetType == "IMAGE" || Widget.widgetType == "YOUTUBE")
                && (!Widget.name)){
                ViewModel.Error = "Please fill the highlighted fields";
            }
            else{
           WidgetService
               .UpdateWidget(ViewModel.WidgetId, Widget)
               .then(function (res) {
                   $location.url("/user/"+ViewModel.UserId+"/website/"+ViewModel.WebsiteId+"/page/"+ViewModel.PageId+"/widget");
               },function (err) {
                   ViewModel.Error = "Unable to update the Website";
               });
        }}
        
        function DeleteWidget(){
            WidgetService
                .DeleteWidget(ViewModel.WidgetId)
                .then(function (res) {
                    $location.url("/user/"+ViewModel.UserId+"/website/"+ViewModel.WebsiteId+"/page/"+ViewModel.PageId+"/widget");
                },function (error) {
                    ViewModel.Error = "Unable to delete a new Widget";
                });
        }
    }
})();

