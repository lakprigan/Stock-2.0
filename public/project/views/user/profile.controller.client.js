/**
 * Created by PriyaArun on 5/24/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService, $rootScope) {

        var ViewModel = this;
        ViewModel.currentUser = $rootScope.currentUser;
        ViewModel.isSelf = true;

        Initialize();
        ViewModel.Logout = Logout;
        ViewModel.UpdateUser = UpdateUser;
        ViewModel.Unregister = Unregister;



        function Initialize() {
            ViewModel.toUser = $routeParams.id;
            ViewModel.id = $rootScope.currentUser._id;

            if(ViewModel.toUser != ViewModel.id){
                ViewModel.isSelf = false;
            }
            
            UserService
                .FindUserById(ViewModel.toUser)
                .then(function (response) {
                    ViewModel.User = response. data;
                },function (err) {
                    ViewModel.Error = "unable to retrieve the user"
                });

        }

        function Logout() {
            UserService
                .Logout()
                .then(function (res) {
                        $location.url("/login");
                    },
                    function (err) {
                        $location.url("/login");
                    })
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
