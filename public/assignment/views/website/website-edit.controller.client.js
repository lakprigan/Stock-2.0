/**
 * Created by PriyaArun on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($location, $routeParams, WebsiteService) {
        var ViewModel = this;
         ViewModel.UserId = $routeParams.id;
        ViewModel.WebsiteId = $routeParams.wid;
        ViewModel.DeleteWebsite = deleteWebsite;
        
        function deleteWebsite() {
            var isDeleted = WebsiteService.DeleteWebsite(ViewModel.WebsiteId);
            if(isDeleted){
                $location.url("/user/"+ViewModel.UserId+"/website");
            }else{
                ViewModel.error = "Unable to delete a new Website";
            }
        }
    }
})();