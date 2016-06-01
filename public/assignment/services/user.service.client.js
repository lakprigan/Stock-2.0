/**
 * Created by PriyaArun on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    
    
    function UserService() {
        var api = {
            CreateUser: CreateUser,
            FindUserByUsernamePassword : FindUserByUsernamePassword,
            FindUserByUsername : FindUserByUsername,
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

        function FindUserByUsername(username) {
            for (var key in Users){
                if(Users[key].username===username){
                    return Users[key];
                }
            }
            return -1;
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
