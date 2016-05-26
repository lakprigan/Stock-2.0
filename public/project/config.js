/**
 * Created by PriyaArun on 5/25/16.
 */
(function(){
    angular
        .module("stockWatch")
        .config(ConfigureRoute);

    function ConfigureRoute($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "client/views/user/login.view.client.html",
            })
            .when("/register", {
                templateUrl: "client/views/user/register.view.client.html"
            })
            .when("/profile", {
                templateUrl: "client/views/user/profile.view.client.html",
            })
            .otherwise({
                redirectTo : "/login"
            });
    }})();
