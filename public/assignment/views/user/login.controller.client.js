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
           var user = UserService.FindUserByUsernamePassword(username, password);
            if(user){
                $location.url("/profile/"+ user._id);
            } else {
                ViewModel.error = "User not found";
            }
        }
    }
})();
