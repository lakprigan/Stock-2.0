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
            ViewModel.UpdateWidget = UpdateWidget;
            ViewModel.DeleteWidget = DeleteWidget;
        }
        
        function UpdateWidget() {
            
        }
        
        function DeleteWidget(){
            var isDeleted = WidgetService.DeleteWidget(ViewModel.WidgetId);
            if(isDeleted){
                $location.url("/user/"+ViewModel.UserId+"/website/"+ViewModel.WebsiteId+"/page/"+ViewModel.PageId+"/widget");
            }else{
                ViewModel.error = "Unable to delete a new Widget";
            }
        }
    }
})();

