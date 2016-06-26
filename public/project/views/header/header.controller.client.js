/**
 * Created by PriyaArun on 6/24/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("HeaderController", HeaderController);

    function HeaderController($location, UserService, $rootScope) {

        var ViewModel = this;

        ViewModel.Logout = Logout;
        init();


        $rootScope.$on("userChanged", function () {
            init();
        });
        

        function init() {
            UserService
                .LoggedIn()
                .then(function (resposnse) {
                        var user = resposnse.data;
                        if (user === '0') {
                            ViewModel.currentUser = null;
                        } else {
                            ViewModel.currentUser = user;
                        }
                    },
                    function (err) {
                        $location.url("/login");
                    });
        }


        function Logout() {
            ViewModel.currentUser = null;
            UserService
                .Logout()
                .then(function (res) {
                        $location.url("/login");
                    },
                    function (err) {
                        $location.url("/login");
                    })
        }
    }
})();
