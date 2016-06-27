/**
 * Created by PriyaArun on 6/18/16.
 */

(function () {
    angular
        .module("StockWatch")
        .controller("CircleController", CircleController);

    function CircleController($location, UserService, $rootScope) {

        var ViewModel = this;
        ViewModel.UpdateUser = UpdateUser;
        ViewModel.FollowUser = FollowUser;
        ViewModel.UnfollowUser = UnfollowUser;
        ViewModel.currentUser = $rootScope.currentUser;

        Initialize();

        function Initialize() {
            ViewModel.username_user = [];
            ViewModel.id = $rootScope.currentUser._id;
            UserService
                .FindUserById(ViewModel.id)
                .then(function (response) {
                    ViewModel.User = response.data;

                    ViewModel.AvailableExperts = [];
                    UserService
                        .GetExperts()
                        .then(function (res) {
                                var temp = res.data;
                                angular.forEach(temp, function (value, key) {
                                    var remove = false;
                                    if (value.username === ViewModel.User.username)
                                        remove = true;

                                    angular.forEach(ViewModel.User.circle, function (name, index) {
                                        if (name === value.username)
                                            remove = true;
                                    });

                                    if (remove === false) {
                                        ViewModel.AvailableExperts.push(value);
                                    }
                                });
                            },
                            function (err) {
                                ViewModel.Error = err.data;
                            });

                    angular.forEach(ViewModel.User.circle, function (value, key) {
                        UserService
                            .FindUserByUsername(value)
                            .then(function (res) {
                                ViewModel.username_user[res.data.username] = res.data._id;
                            });
                    });
                }, function (err) {
                    ViewModel.Error = "unable to retrieve the user"
                });
        }

        function FollowUser(index) {
            var user = ViewModel.AvailableExperts[index];
            ViewModel.User.circle.push(user.username);
            ViewModel.AvailableExperts.splice(index, 1);
            UserService.UpdateUser(ViewModel.User._id, ViewModel.User)
                .then(function (res) {
                    Initialize();
                }, function (err) {
                    ViewModel.Error = "Cannot update user"
                });
        }

        function UnfollowUser(index) {
            var user = {username: ViewModel.User.circle[index]};
            ViewModel.AvailableExperts.push(user);
            ViewModel.User.circle.splice(index, 1);
            UserService.UpdateUser(ViewModel.User._id, ViewModel.User)
                .then(function (res) {
                    Initialize();
                }, function (err) {
                    ViewModel.Error = "Cannot update user"
                });
        }

        function UpdateUser(updatedUser) {
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
    }
})();
