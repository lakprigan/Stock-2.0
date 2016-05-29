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
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "Login"
            })
            .when("/register", {
                templateUrl: "views/user/register.view.client.html"
            })
            .when("/user/:id", {
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "Profile"
            })
            .when("/user/:id/website/new", {
                templateUrl: "views/website/website-new.view.client.html",
                controller: "WebsiteNewController",
                controllerAs: "model"
            })
            .when("/user/:id/website/:wid", {
                templateUrl: "views/website/website-edit.view.client.html",
                controller: "WebsiteEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website", {
                templateUrl: "views/website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/widget/widget-list.view.client.html",
                 controller: "WidgetListController",
                 controllerAs: "model"
            })
            .when("/page-list", {
                templateUrl: "/user/:uid/website/:wid/page",
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/page-new", {
                templateUrl: "/user/:uid/website/:wid/page/new",
                controller: "PageNewController",
                controllerAs: "model"
            })
            .when("/page-edit", {
                templateUrl: "/user/:uid/website/:wid/page/:pid",
                controller: "PageEditController",
                controllerAs: "model"
            })
            .when("/widget-chooser", {
                templateUrl: "views/widget/widget-chooser.view.client.html"
            })
            .otherwise({
                redirectTo : "/login"
            });
            }})();
