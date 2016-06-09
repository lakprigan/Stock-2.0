/**
 * Created by PriyaArun on 5/24/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {

        var ViewModel = this;
        Initialize();

        function Initialize() {
            ViewModel.id = $routeParams.id;
            UserService
                .FindUserById(ViewModel.id)
                .then(function (response) {
                    ViewModel.User = response. data;
                },function (err) {
                    ViewModel.Error = "unable to retrieve the user"
                });
            ViewModel.UpdateUser = UpdateUser;
            ViewModel.Unregister = Unregister;
        }

        function UpdateUser(updatedUser) {
           UserService.UpdateUser(ViewModel.id, updatedUser)
               .then(function (response) {
               ViewModel.Success = "Profile of "+ updatedUser.username + " successfully updated!";
                   ViewModel.Error = null;
           },
               function (error) {
                   ViewModel.Error = "unable to update user";
                   ViewModel.Success = null;
               });
        }

        function Unregister() {
            UserService.DeleteUser(ViewModel.id)
                .then(function (response) {
                    $location.url("/login");
                },
                function (error){
                    ViewModel.Error = "unable to remove user";
                });
        }

    }
})();
