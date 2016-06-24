/**
 * Created by PriyaArun on 6/19/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("PortfolioListController", PortfolioListController);

    function PortfolioListController($routeParams, PortfolioService, StockService, $rootScope) {
        var ViewModel = this;
        ViewModel.DeletePortfolio = DeletePortfolio;
        ViewModel.Portfolio_Stocks = [];
        Initialize();

        function Initialize() {
            ViewModel.UserId = $rootScope.currentUser._id;;
            PortfolioService
                .FindPortfoliosByUserId(ViewModel.UserId)
                .then(function (response) {
                    ViewModel.Portfolios = response.data;
                    angular.forEach(ViewModel.Portfolios, function (value) {
                        StockService
                            .FindStocksByPortfolioId(value._id)
                            .then(function (res) {
                                ViewModel.Portfolio_Stocks[value._id] = res.data;
                            });
                    })
                });


        }

        function DeletePortfolio(portfolio) {
            PortfolioService
                .DeletePortfolio(portfolio._id)
                .then(function () {
                    Initialize();
                }, function (error) {
                    ViewModel.error = "Unable to delete portfolio";
                });
        }
    }
})();