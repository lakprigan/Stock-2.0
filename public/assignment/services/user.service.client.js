/**
 * Created by PriyaArun on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    var Users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];
    
    function UserService() {
        var api = {
            CreateUser: CreateUser,
            FindUserByUsernamePassword : FindUserByUsernamePassword,
            UpdateUser: UpdateUser,
            FindUserById: FindUserById,
            DeleteUser: DeleteUser,
            UpdateUserByUsername: UpdateUserByUsername
        };
        return api;

        function UpdateUserByUsername(username, updatedUser){
            for(var i in Users){
                if(Users[i].username === username){
                    Users[i].firstName = updatedUser.firstName;
                    Users[i].lastName = updatedUser.lastName;
                    return true
                }
            }
            return false;
        }

        function FindUserByUsernamePassword(username, password) {
            for(var key in Users)
            {
                if(Users[key].username===username
                    && Users[key].password ===password){
                  return Users[key];
                }
            }
            return null;
        }
        
        //TBD: return can be shown to end user
        function UpdateUser(id, updatedUser) {
            for(var i in Users){
                if(Users[i]._id === id){
                    Users[i].firstName = updatedUser.firstName;
                    Users[i].lastName = updatedUser.lastName;
                    return true
                }
            }
            return false;
        }
        
        function FindUserById(id) {
            for (var key in Users){
                if(Users[key]._id==id){
                   return Users[key];
                }
            }
            return null;
        }

        function CreateUser(newUser) {
            Users.push(newUser);
        }

        function DeleteUser(id) {
            for(var i in Users){
                if(Users[i]._id === id){
                   Users.splice(i);
                    return true;
                }
            }
            return false;
        }
    }
})();
