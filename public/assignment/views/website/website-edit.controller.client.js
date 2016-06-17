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
            WebsiteService
                .FindWebsiteById(ViewModel.WebsiteId)
                .then(function (res) {
                    ViewModel.Website = res.data;
                })
        }
        
        function deleteWebsite() {
          WebsiteService
                .DeleteWebsite(ViewModel.WebsiteId)
              .then(function () {
                  $location.url("/user/"+ViewModel.UserId+"/website");   
              },function (error) {
                  ViewModel.error = "Unable to delete a new Website";   
              });
        }

        function updateWebsiteById(name, description) {
            ViewModel.SubmittedClass = "submitted";
            if(name){
                ViewModel.SubmittedClass = "";
            var updatedWebsite =  { "name": name, "developerId": ViewModel.UserId, "description" : description };
            WebsiteService
                .UpdateWebsite(ViewModel.WebsiteId, updatedWebsite)
                .then(function (res) {
                    $location.url("/user/"+ViewModel.UserId+"/website");
                },function (err) {
                    ViewModel.Error = "Unable to update the Website";
                });
        }
        else {
                ViewModel.Error = "Please enter the highlighted field"
            }
        }
    }
})();