/**
 * Created by PriyaArun on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($location, $routeParams, WebsiteService) {
        var ViewModel = this;
        Initialize();


        function Initialize() {
            ViewModel.UserId = $routeParams.id;
            ViewModel.WebsiteId = $routeParams.wid;
            ViewModel.CreateNewWebsite = CreateNewWebsite;
        }

        function CreateNewWebsite(name, description) {
           var newWebsite = WebsiteService.CreateNewWebsite(ViewModel.UserId, name, description);
            if(newWebsite){
                $location.url("/user/"+ViewModel.UserId+"/website");
            }else{
                ViewModel.error = "Unable to create a new Website";
            }
        }

    }
})();
