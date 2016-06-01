/**
 * Created by PriyaArun on 5/24/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    
    function LoginController($location, UserService) {
        var ViewModel = this;
        
        ViewModel.login = function (username, password) {

           UserService
               .FindUserByUsernamePassword(username, password)
               .then(function (response) {
                var user = response.data;
                if(user){
                    $location.url("/user/"+ user._id);
                } else {
                    ViewModel.Error = "User not found!";
                }
            });

        }
    }
})();
