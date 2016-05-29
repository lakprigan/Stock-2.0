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
            ViewModel.Widget  = WidgetService.FindWidgetById(ViewModel.WidgetId);
            ViewModel.WidgetSizes = [1, 2, 3, 4, 5, 6];
            ViewModel.UpdateWidget = UpdateWidget;
            ViewModel.DeleteWidget = DeleteWidget;
        }
        
        function UpdateWidget(Widget) {
            var isUpdated = WidgetService.UpdateWidget(ViewModel.WidgetId, Widget);
            if(isUpdated){
                $location.url("/user/"+ViewModel.UserId+"/website/"+ViewModel.WebsiteId+"/page");
            }else{
                ViewModel.Error = "Unable to update the Website";
            }
        }
        
        function DeleteWidget(){
            var isDeleted = WidgetService.DeleteWidget(ViewModel.WidgetId);
            if(isDeleted){
                $location.url("/user/"+ViewModel.UserId+"/website/"+ViewModel.WebsiteId+"/page/"+ViewModel.PageId+"/widget");
            }else{
                ViewModel.Error = "Unable to delete a new Widget";
            }
        }
    }
})();

