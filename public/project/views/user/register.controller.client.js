/**
 * Created by PriyaArun on 5/29/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $routeParams, UserService) {

        var ViewModel = this;
        ViewModel.Register = Register;
        ViewModel.SubmittedClass = "";


        function Register(user) {
            ViewModel.SubmittedClass = "submitted";
            if (!user) {
                ViewModel.Error = "Please enter the highlighted fields";
            }
            else if (!user.password || !user.username || !user.verifyPassword) {
                ViewModel.Error = "Please enter the highlighted fields";
            }
            else if (user.password != user.verifyPassword) {
                ViewModel.Error = "Passwords don't match";
            }
            else {
                UserService
                    .Register(user)
                    .then(function (response) {
                        var retrievedUser = response.data;
                        if (retrievedUser) {
                            $location.url("/user/" + retrievedUser._id);
                        }
                    }, function (err) {
                        ViewModel.Error = err.data;
                    });
            }
        }

    }
})();