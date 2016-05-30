/**
 * Created by PriyaArun on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController($location, $routeParams, WidgetService) {
        var ViewModel = this;
        Initialize();
        function Initialize() {
            ViewModel.PageId = $routeParams.pid;
            ViewModel.UserId = $routeParams.uid;
            ViewModel.WebsiteId = $routeParams.wid;
            ViewModel.WidgetId = $routeParams.wgid;
            ViewModel.Widget = WidgetService.FindWidgetById(ViewModel.WidgetId);
            ViewModel.CreateWidget = CreateWidget;
        }


        function CreateWidget(widgetType){
            var Widget = {
                _id : (new Date()).getTime() + "",
            widgetType : widgetType,
            pageId : ViewModel.PageId
        }
            if(widgetType === 'HEADER'){
                Widget.size = 3;
            }
            var newWidget = WidgetService.CreateWidget(Widget);
            $location.url("/user/"+ViewModel.UserId+"/website/"+ViewModel.WebsiteId+"/page/"+ViewModel.PageId+"/widget/"+Widget._id);

        }
    }
})();