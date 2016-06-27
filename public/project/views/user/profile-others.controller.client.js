/**
 * Created by PriyaArun on 5/24/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("ProfileOthersController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {

        var ViewModel = this;
        
        Initialize();

        function Initialize() {
            ViewModel.id = $routeParams.id;
            ViewModel.CircleUsers = [];
            UserService
                .FindUserById(ViewModel.id)
                .then(function (response) {
                    ViewModel.User = response.data;
                    angular.forEach(ViewModel.User.circle, function (value, key) {
                        UserService
                            .FindUserByUsername(value)
                            .then(function (res) {
                                ViewModel.CircleUsers.push(res.data);
                            });
                    });
                }, function (err) {
                    ViewModel.Error = "unable to retrieve the user"
                });
        }


    }
})();
