/**
 * Created by PriyaArun on 5/24/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);
    
    function LoginController() {
        var ViewModel = this;
        var Users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ]
        ViewModel.login = function (username, password) {
            for(var key in Users)
            {
                if(Users[key].username===username
                    && Users[key].password ===password){
                   
                }
                else
                    ViewModel.Error = "User Not Found";
            }
        }
    }
})();
