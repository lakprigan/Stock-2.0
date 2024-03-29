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
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "views/user/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/user",{
                templateUrl: "views/user/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/register",{
                templateUrl: "views/user/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
             })
            .when("/about",{
                templateUrl: "views/about/about.view.client.html"
            })
            .when("/user/:id",{
                templateUrl: "views/user/profile-others.view.client.html",
                controller: "ProfileOthersController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:id/circle",{
                templateUrl: "views/circle/circle.view.client.html",
                controller: "CircleController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:id/portfolio",{
                templateUrl: "views/portfolio/portfolio-list.view.client.html",
                controller: "PortfolioListController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:id/opinion",{
                templateUrl: "views/opinion/opinions.view.client.html",
                controller: "OpinionListController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:id/opinion/:oid",{
                templateUrl: "views/opinion/edit-opinion.view.client.html",
                controller: "EditOpinionController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:id/newopinion",{
                templateUrl: "views/opinion/new-opinion.view.client.html",
                controller: "NewOpinionController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:id/portfolio/new",{
                templateUrl: "views/portfolio/portfolio-new.view.client.html",
                controller: "PortfolioNewController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:id/portfolio/:pid",{
                templateUrl: "views/portfolio/portfolio-edit.view.client.html",
                controller: "PortfolioEditController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:id/portfolio/:pid/stock",{
                templateUrl: "views/stock/stock-list.view.client.html",
                controller: "StockListController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:id/portfolio/:pid/stock/new",{
                templateUrl: "views/stock/stock-new.view.client.html",
                controller: "StockNewController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:id/portfolio/:pid/stock/:sid",{
                templateUrl: "views/stock/stock-details.view.client.html",
                controller: "StockDetailsController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:id/portfolio/:pid/stock/:sid/comment",{
                templateUrl: "views/comment/comment.view.client.html",
                controller: "CommentController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/user/:id/portfolio/:pid/stock/:sid/edit",{
                templateUrl: "views/stock/stock-edit.view.client.html",
                controller: "StockEditController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .otherwise({
                redirectTo: "/home"
            });

        function checkLoggedIn(UserService, $location, $q, $rootScope) {
            var deferred = $q.defer();

            UserService
                .LoggedIn()
                .then(function (resposnse) {
                        var user = resposnse.data;
                        if(user === '0'){
                            $rootScope.currentUser = null;
                            $rootScope.$broadcast("userChanged");
                            deferred.reject();
                            $location.url("/login");
                        }else{
                            $rootScope.currentUser = user;
                            $rootScope.$broadcast("userChanged");
                            deferred.resolve();
                        }
                    },
                    function (err) {
                        $location.url("/login");
                    });
            return deferred.promise;
        }
    }
})();
