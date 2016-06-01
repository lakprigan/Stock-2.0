/**
 * Created by PriyaArun on 5/24/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {

        var ViewModel = this;
        Initialize();

        function Initialize() {
            ViewModel.id = $routeParams.id;
            UserService
                .FindUserById(ViewModel.id)
                .then(function (response) {
                    ViewModel.User = response. data;
                });
            ViewModel.UpdateUser = UpdateUser;
        }

        function UpdateUser(updatedUser) {
           if(UserService.UpdateUser(ViewModel.id, updatedUser)){
               ViewModel.Success = "Profile of "+ updatedUser.username + " successfully updated!"
           }
        }

    }
})();
