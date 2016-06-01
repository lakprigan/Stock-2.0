/**
 * Created by PriyaArun on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var ViewModel = this;
        Initialize();


        function Initialize() {
            ViewModel.UserId = $routeParams.uid;
             WebsiteService
                 .FindWebsitesByUserId(ViewModel.UserId)
                 .then(function (response) {
                     ViewModel.Websites = response.data;
                 })
        }
    }
})();
