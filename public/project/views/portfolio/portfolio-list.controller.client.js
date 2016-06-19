/**
 * Created by PriyaArun on 6/19/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("PortfolioListController", PortfolioListController);

    function PortfolioListController($routeParams, PortfolioService) {
        var ViewModel = this;
        Initialize();

        function Initialize() {
            ViewModel.UserId = $routeParams.id;
            PortfolioService
                .FindPortfoliosByUserId(ViewModel.UserId)
                .then(function (response) {
                    ViewModel.Portfolios = response.data;
                });
        }
    }
})();