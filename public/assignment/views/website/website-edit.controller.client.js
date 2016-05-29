/**
 * Created by PriyaArun on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($location, $routeParams, WebsiteService) {
        var ViewModel = this;
        Initialize();
        
        function Initialize() {
            ViewModel.UserId = $routeParams.id;
            ViewModel.WebsiteId = $routeParams.wid;
            ViewModel.DeleteWebsite = deleteWebsite;
            ViewModel.UpdateWebsiteById = updateWebsiteById;
            ViewModel.Website = WebsiteService.FindWebsiteById(ViewModel.WebsiteId);
        }
        
        function deleteWebsite() {
            var isDeleted = WebsiteService.DeleteWebsite(ViewModel.WebsiteId);
            if(isDeleted){
                $location.url("/user/"+ViewModel.UserId+"/website");
            }else{
                ViewModel.error = "Unable to delete a new Website";
            }
        }



        function updateWebsiteById(name, description) {
            var updatedWebsite =  { "name": name, "developerId": ViewModel.UserId };
            var isUpdated = WebsiteService.UpdateWebsite(ViewModel.WebsiteId, updatedWebsite);
            if(isUpdated){
                $location.url("/user/"+ViewModel.UserId+"/website");
            }else{
                ViewModel.error = "Unable to update the Website";
            }
        }
    }
})();