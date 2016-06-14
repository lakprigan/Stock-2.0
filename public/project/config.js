/**
 * Created by PriyaArun on 5/25/16.
 */
(function () {
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
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register",{
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
             })
            .when("/user/:id",{
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:id/portfolio",{
                templateUrl: "views/portfolio/portfolio-list.view.client.html"
            })
            .when("/user/:id/portfolio/new",{
                templateUrl: "views/portfolio/portfolio-new.view.client.html"
            })
            .when("/user/:id/portfolio/:pid",{
                templateUrl: "views/portfolio/portfolio-edit.view.client.html"
            })
            .when("/user/:id/portfolio/:pid/stock",{
                templateUrl: "views/stock/stock-list.view.client.html"
            })
            .otherwise({
                redirectTo: "/home"
            });
    }
})();
