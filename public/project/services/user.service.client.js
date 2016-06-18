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
            DeleteUser: DeleteUser,
            Login: Login,
            Logout: Logout,
            LoggedIn: LoggedIn,
            Register: Register
        };

        return api;

        function LoggedIn() {
            var url = "/api/stockwatch/loggedIn";
            return $http.get(url);
        }

        function FindUserByUsernamePassword(username, password) {
            var url = "/api/stockwatch/user?username="+username+"&&password="+password;
            return $http.get(url);
        }

        function Logout() {
            var url = "/api/stockwatch/logout";
            return $http.post(url);
        }
        function Login(username, password) {
            //var url = "/api/user?username="+username+"&&password="+password;
            var url = "/api/stockwatch/login";
            return $http.post(url,{username : username, password: password});
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

        function Register(newUser) {
            var url = "/api/stockwatch/register/";
            return $http.post(url,newUser);
        }

        function DeleteUser(id) {
            var url = "/api/stockwatch/user/"+id;
            return $http.delete(url);
        }
    }
})();
