/**
 * Created by PriyaArun on 5/26/16.
 */
(function () {
    angular
        .modolule("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var ViewModel = this;
        Initialize();
    }
    
    function Initialize() {
       ViewModel.Websites = WebsiteService.FindWebsitesByUserId($routeParams.uid)
    }

})();
