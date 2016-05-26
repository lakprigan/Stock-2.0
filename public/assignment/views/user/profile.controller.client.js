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
            var id = $routeParams.id;
            ViewModel.User = UserService.FindUserById(id);
        }

        function UpdateUser(updatedUser) {
           UserService.UpdateUser(id, updatedUser);
        }

    }
})();
