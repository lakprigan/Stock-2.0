/**
 * Created by PriyaArun on 5/26/16.
 */
(function () {
    angular
        .module("StockWatch")
        .factory("UserService", UserService);
    
    function UserService($http) {
        var api = {
            CreateUser: CreateUser,
            FindUserByUsernamePassword : FindUserByUsernamePassword,
            FindUserByUsername : FindUserByUsername,
            UpdateUser: UpdateUser,
            FindUserById: FindUserById,
            DeleteUser: DeleteUser
        };

        return api;

        function FindUserByUsernamePassword(username, password) {
            var url = "/api/stockwatch/user?username="+username+"&&password="+password;
            return $http.get(url);
        }

        function UpdateUser(id, updatedUser) {
            var url = "/api/stockwatch/user/"+ id;
            return $http.put(url, updatedUser);
        }
        
        function FindUserById(id) {
            var url = "/api/stockwatch/user/" + id;
            return $http.get(url);
        }

        function FindUserByUsername(username) {
            var url = "/api/stockwatch/user?username=" + username;
            return $http.get(url);
        }

        function CreateUser(newUser) {
            var url = "/api/stockwatch/user/"
            return $http.post(url,newUser);
        }

        function DeleteUser(id) {
            var url = "/api/stockwatch/user/"+id;
            return $http.delete(url);
        }
    }
})();
