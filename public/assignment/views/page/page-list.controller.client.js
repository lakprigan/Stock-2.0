/**
 * Created by PriyaArun on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var ViewModel = this;
        Initialize();
        
        function Initialize() {
            ViewModel.UserId = $routeParams.uid;
            ViewModel.WebsiteId = $routeParams.wid;
            PageService
                .FindPageByWebsiteId(ViewModel.WebsiteId)
                .then(function (res) {
                    ViewModel.Pages = res.data;
                })
        }
    }
})();

