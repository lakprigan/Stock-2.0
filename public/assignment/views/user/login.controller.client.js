/**
 * Created by PriyaArun on 5/24/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);


    function LoginController($location, UserService, $rootScope) {
        var ViewModel = this;
        ViewModel.SubmittedClass = "";
        ViewModel.login = function (username, password) {
            ViewModel.SubmittedClass = "submitted";
            if(username && password){
           UserService
               .Login(username, password)
               .then(function (response) {
                var user = response.data;
                if(user){
                    if(user._id){
                        $rootScope.currentUser = user;
                    $location.url("/user/"+ user._id);

                    }} else {
                    ViewModel.Error = "User not found!";
                }
            }, function (err) {
                   ViewModel.Error = err.data;
               });
        }
        else{
                ViewModel.Error = "Please fill the highlighted Fields";
            }
        }
    }
})();
