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
           WebsiteService
               .CreateNewWebsite(ViewModel.UserId, name, description)
               .then(function (res) {
                   $location.url("/user/"+ViewModel.UserId+"/website");
               },function (err) {
                   ViewModel.error = "Unable to create a new Website";
               });
        }
    }
})();
