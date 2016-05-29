/**
 * Created by PriyaArun on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($location, $routeParams, PageService) {
        var ViewModel = this;
        Initialize();
        function Initialize() {
            ViewModel.UserId = $routeParams.uid;
            ViewModel.WebsiteId = $routeParams.wid;
            ViewModel.PageId = $routeParams.pid;

            ViewModel.CreateNewPage = CreateNewPage;
        }
        function CreateNewPage(name, description) {
            var newPage = PageService.CreatePage(ViewModel.WebsiteId, name, description);
            if(newPage){
                $location.url("/user/"+ViewModel.UserId+"/website/"+ViewModel.WebsiteId+"/page");
            }else{
                ViewModel.error = "Unable to create a new Page";
            }
        }
    }
})();
