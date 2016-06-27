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
        ViewModel.SubmittedClass = "";
        Initialize();
        ViewModel.Logout = Logout;
        ViewModel.UpdateUser = UpdateUser;
        ViewModel.Unregister = Unregister;

        function Initialize() {
            ViewModel.id = $rootScope.currentUser._id;
            ViewModel.userInCircle = [];
            UserService
                .FindUserById(ViewModel.id)
                .then(function (response) {
                    ViewModel.User = response.data;
                    angular.forEach(ViewModel.User.circle, function (value) {
                        console.log(value);
                        UserService
                            .FindUserByUsername(value)
                            .then(function (response) {
                                ViewModel.userInCircle[value] = response.data._id;
                            }, function (err) {
                                console.log("here");
                            });
                    });
                }, function (err) {
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
            ViewModel.SubmittedClass = "submitted";
            if (updatedUser.firstName && updatedUser.lastName && updatedUser.email) {
                UserService.UpdateUser(ViewModel.id, updatedUser)
                    .then(function (response) {
                            ViewModel.Success = "Profile of " + updatedUser.username + " successfully updated!";
                            ViewModel.Error = null;
                        },
                        function (error) {
                            ViewModel.Error = "unable to update user";
                            ViewModel.Success = null;
                        });
            }
            else {
                ViewModel.Success = null;
                ViewModel.Error = "Errors in the highlighted fields"
            }
        }

        function Unregister() {
            UserService.DeleteUser(ViewModel.id)
                .then(function (response) {
                        $location.url("/login");
                    },
                    function (error) {
                        ViewModel.Error = "unable to remove user";
                    });
        }

    }
})();
