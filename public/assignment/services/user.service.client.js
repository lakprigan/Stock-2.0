/**
 * Created by PriyaArun on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    
    function UserService($http) {
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
            var url = "/api/user?username="+username+"&&password="+password;
            return $http.get(url);
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
            var url = "/api/user/" + id;
            return $http.get(url);
        }

        function FindUserByUsername(username) {
            var url = "/api/user?username=" + username;
            return $http.get(url);
        }

        function CreateUser(newUser) {
            var url = "/api/user/"
            return $http.post(url,newUser);
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
