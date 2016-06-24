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

            UserService
                .FindUserById(ViewModel.id)
                .then(function (response) {
                    ViewModel.User = response. data;
                },function (err) {
                    ViewModel.Error = "unable to retrieve the user"
                });
        }
        

    }
})();
