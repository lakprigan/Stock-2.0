/**
 * Created by PriyaArun on 6/18/16.
 */

(function () {
    angular
        .module("StockWatch")
        .controller("CircleController", CircleController);

    function CircleController($location, UserService, $rootScope) {

        var ViewModel = this;

        ViewModel.currentUser = $rootScope.currentUser;
        Initialize();

        function Initialize() {
            ViewModel.id = $rootScope.currentUser._id;
            UserService
                .FindUserById(ViewModel.id)
                .then(function (response) {
                    ViewModel.User = response.data;
                }, function (err) {
                    ViewModel.Error = "unable to retrieve the user"
                });

            ViewModel.UpdateUser = UpdateUser;
            ViewModel.FollowUser = FollowUser;
            ViewModel.UnfollowUser = UnfollowUser;
            ViewModel.AvailableExperts = [];
            UserService
                .GetExperts()
                .then(function (res) {
                        ViewModel.AvailableExperts = res.data;
                        angular.forEach(ViewModel.AvailableExperts, function (value, key) {
                            if(value.username === ViewModel.currentUser.username){
                                ViewModel.AvailableExperts.splice(key, 1);
                            }
                            angular.forEach(ViewModel.User.circle, function (follow) {
                                if (value.username == follow) {
                                    ViewModel.AvailableExperts.splice(key, 1);
                                }
                            })
                        });
                    },
                    function (err) {
                        ViewModel.Error = err.data;
                    });
        }

        function FollowUser(index) {
            var user = ViewModel.AvailableExperts[index];
            ViewModel.User.circle.push(user.username);
            ViewModel.AvailableExperts.splice(index, 1);
            UserService.UpdateUser(ViewModel.User._id,ViewModel.User)
            .then(function (res) {

            },function (err) {
                ViewModel.Error = "Cannot update user"
            });
        }

        function UnfollowUser(index) {
            var user = {username : ViewModel.User.circle[index]};
            ViewModel.AvailableExperts.push(user);
            ViewModel.User.circle.splice(index, 1);
            UserService.UpdateUser(ViewModel.User._id,ViewModel.User)
                .then(function (res) {

                },function (err) {
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
