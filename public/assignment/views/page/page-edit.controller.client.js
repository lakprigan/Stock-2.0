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
             PageService
                 .FindPageById(ViewModel.PageId)
                 .then(function (res) {
                     ViewModel.Page = res.data;
                 })
        }

        function deletePage() {
           PageService
               .DeletePage(ViewModel.PageId)
               .then(function (res) {
                   $location.url("/user/"+ViewModel.UserId+"/website/"+ViewModel.WebsiteId+"/page");
               },
               function (err) {
                   ViewModel.error = "Unable to delete the Page";
               });
        }

        function updatePage(name, title) {
            var updatedPage =  { "name": name, "title" : title };
            PageService
                .UpdatePage(ViewModel.PageId, updatedPage)
                .then(function (res) {
                    $location.url("/user/"+ViewModel.UserId+"/website/"+ViewModel.WebsiteId+"/page");
                },function (err) {
                    ViewModel.error = "Unable to update the Page";
                });
        }
    }
})();

