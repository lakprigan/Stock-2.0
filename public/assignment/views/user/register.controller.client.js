/**
 * Created by PriyaArun on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController($location, $routeParams, UserService) {

        var ViewModel = this;
        ViewModel.CreateUser = CreateUser;

        function CreateUser(user) {
            UserService
                .FindUserByUsername(user.username)
                .then(function (response) {
                    var retrievedUser = response.data;
                    if(retrievedUser.username == null)
                    {
                        if(user.password === user.verifyPassword){
                            var newUser = {username: user.username, password : user.password};
                            UserService
                                .CreateUser(newUser)
                                .then(function (response) {
                                    var retrievedUser = response.data;
                                    if(retrievedUser){
                                        $location.url("/user/"+retrievedUser._id);
                                    }
                                })
                        }
                        else
                        {
                            ViewModel.Error = "Passwords don't match!";
                        }
                    }
                    else{
                        ViewModel.Error = "Username exists, please choose a different username";
                    }
                })

        }

    }
})();