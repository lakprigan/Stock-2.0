/**
 * Created by PriyaArun on 6/18/16.
 */
/**
 * Created by PriyaArun on 5/24/16.
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
            ViewModel.ToggleFollow = ToggleFollow;
            
            UserService
                .GetExperts()
                .then(function (res) {
                        ViewModel.AvailableExperts = res.data;
                    angular.forEach(ViewModel.AvailableExperts, function (all) {
                            angular.forEach(ViewModel.User.circle, function (follow, index) {
                                if (all.username === follow) {
                                    ViewModel.AvailableExperts.splice(all, 1);
                                }
                            })
                        });
                    },
                    function (err) {
                        ViewModel.Error = err.data;
                    });
        }

        function ToggleFollow(user, action){
            if(action === 'follow')
                ViewModel.User.circle.push(user);
            else {
                angular.forEach(ViewModel.User.circle, function (name) {
                    if(name === user && name!=null)
                        ViewModel.User.circle.splice(name, 1);
                });
            }
            UpdateUser(ViewModel.User);
            Initialize();
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
