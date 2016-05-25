/**
 * Created by PriyaArun on 5/24/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    var Users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    function ProfileController($routeParams) {

        var ViewModel = this;
        var index = -1;
        ViewModel.UpdateUser = UpdateUser;

        var id = $routeParams.id;
        for (var key in Users){
            if(Users[key]._id==id){
                ViewModel.User = Users[key];
                index = key;
            }
        }

        function UpdateUser(newUser) {
            if(index!= -1){
            Users[index].firstName = newUser.firstName;
            Users[index].lastName = newUser.lastName;
        }
        }
    }
})();
