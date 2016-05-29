/**
 * Created by PriyaArun on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($location, $routeParams, PageService) {
        var ViewModel = this;
        Initialize();

        function Initialize() {
            ViewModel.UserId = $routeParams.uid;
            ViewModel.WebsiteId = $routeParams.wid;
            ViewModel.PageId= $routeParams.pid;
            ViewModel.DeletePage = deletePage;
            ViewModel.UpdatePage = updatePage;
        }

        function deletePage() {
            var isDeleted = PageService.DeletePage(ViewModel.PageId);
            if(isDeleted){
                $location.url("/user/"+ViewModel.UserId+"/website/"+ViewModel.WebsiteId+"/page");
            }else{
                ViewModel.error = "Unable to delete the Page";
            }
        }

        function updatePage(name, title) {
            var updatedPage =  { "name": name };
            var isUpdated = PageService.UpdatePage(ViewModel.PageId, updatedPage);
            if(isUpdated){
                $location.url("/user/"+ViewModel.UserId+"/website/"+ViewModel.WebsiteId+"/page");
            }else{
                ViewModel.error = "Unable to update the Page";
            }
        }
    }
})();

