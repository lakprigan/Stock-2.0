/**
 * Created by PriyaArun on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($routeParams, UserService) {

        var ViewModel = this;
        ViewModel.CreateUser = CreateUser;

        function CreateUser(user) {
            if(UserService.FindUserByUsername(user.username) === -1)
            {
                if(user.password === user.verifyPassword){
                    var newUser = {_id: (new Date()).getTime()+"", username: user.username, password : user.password}
                }
                else
                {
                    ViewModel.Error = "Passwords don't match!"
                }
            }
            else{
                ViewModel.Error = "Username exists, please choose a different username"
            }
        }

    }
})();