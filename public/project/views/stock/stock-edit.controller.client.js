/**
 * Created by PriyaArun on 5/29/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("StockEditController", StockEditController);

    function StockEditController($location, $routeParams, StockService, $rootScope) {
        var ViewModel = this;

        Initialize();

        function Initialize() {
            ViewModel.UserId = $rootScope.currentUser._id;
            ViewModel.PortfolioId = $routeParams.pid;
            ViewModel.StockId= $routeParams.sid;

            ViewModel.UpdateStock = UpdateStock;
            StockService
                .FindStockById(ViewModel.StockId)
                .then(function (res) {
                    ViewModel.Stock = res.data;
                })
        }

        function UpdateStock() {
            StockService
                .UpdateStock(ViewModel.StockId, ViewModel.Stock)
                .then(function (res) {
                    $location.url("/user/"+ViewModel.UserId+"/portfolio/"+ViewModel.PortfolioId+"/stock");
                },function (err) {
                    ViewModel.error = "Unable to update the Stock";
                });
        }
    }
})();

