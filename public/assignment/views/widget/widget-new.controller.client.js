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
            // WidgetService
            //     .FindWidgetById(ViewModel.WidgetId)
            //     .then(function (res) {
            //         ViewModel.Widget = res.data;
            //     });
            ViewModel.CreateWidget = CreateWidget;
        }


        function CreateWidget(widgetType){
            var Widget = {
            widgetType : widgetType,
            pageId : ViewModel.PageId};

            if(widgetType === 'HEADER'){
                Widget.size = 3;
            }

             WidgetService
                 .CreateWidget(Widget)
                 .then(function (res) {
                     $location.url("/user/"+ViewModel.UserId+"/website/"+ViewModel.WebsiteId+"/page/"+ViewModel.PageId+"/widget/"+res.data);
                 },
                 function (err) {
                     console.log("err");
                 });
        }
    }
})();