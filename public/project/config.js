/**
 * Created by PriyaArun on 5/25/16.
 */
(function(){
    angular
        .module("StockWatch")
        .config(ConfigureRoute);

    function ConfigureRoute($routeProvider) {
        $routeProvider
            .when("/home", {
                templateUrl: "views/home/home.view.client.html",
                controller: "HomeController",
                controllerAs: "ctrl"
            })
            .otherwise({
                redirectTo : "/home"
            });
    }})();
