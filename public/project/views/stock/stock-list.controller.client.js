/**
 * Created by PriyaArun on 6/19/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("StockListController", StockListController);

    function StockListController($routeParams, StockService, QuandlService, $rootScope) {
        var ViewModel = this;
        Initialize();

        function Initialize() {
            ViewModel.UserId = $rootScope.currentUser._id;;
            ViewModel.PortfolioId = $routeParams.pid;
            ViewModel.DeleteStock = DeleteStock;
            ViewModel.UpdatedStocks = [];
            StockService
                .FindStocksByPortfolioId(ViewModel.PortfolioId)
                .then(function (res) {
                    ViewModel.Stocks = res.data;
                    UpdateCurrentStockValue();
                    if (ViewModel.UpdatedStocks.length === 0) {
                        ViewModel.Error = "Cannot get current stock worth!"
                    }
                });
        }

        function DeleteStock(id) {
        StockService
            .DeleteStock(id).then(function (res) {
            Initialize();
        }, function (err) {
            ViewModel.Error = "unable to delete the stock!";
        })
        }
        
        function UpdateCurrentStockValue() {
            var updatedStocks = [];
            angular.forEach(ViewModel.Stocks, function (stock) {
                QuandlService
                    .getStockData(stock.code)
                   .then(function (res) {
                        var curStock = res.data;
                        var curRate = parseFloat(curStock.dataset.data[0][4]) * parseFloat(stock.investmentQuantity);
                        stock.presentValue =  curRate - parseFloat(stock.investmentPrice);
                        ViewModel.UpdatedStocks.push(stock);
                    });
            });
        }

    }
})();