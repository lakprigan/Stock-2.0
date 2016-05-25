/**
 * Created by PriyaArun on 5/24/16.
 */
(function(){
    angular
        .module("WebAppMaker")
        .config(ConfigureRoute);
    
    function ConfigureRoute($routeProvider) {
        $routeProvider
            .when("/login", {
                templateUrl: "views/user/login.view.client.html"
            });
            }})();
