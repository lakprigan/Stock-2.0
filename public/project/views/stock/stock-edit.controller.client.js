/**
 * Created by PriyaArun on 5/29/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("StockEditController", StockEditController);

    function StockEditController($location, $routeParams, StockService, $rootScope) {
        var ViewModel = this;
        ViewModel.SubmittedClass="";
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
            ViewModel.SubmittedClass="submitted";
            if(ViewModel.Stock.investmentQuantity!=undefined && ViewModel.Stock.investmentPrice!=undefined){
                StockService
                    .UpdateStock(ViewModel.StockId, ViewModel.Stock)
                    .then(function (res) {
                        $location.url("/user/"+ViewModel.UserId+"/portfolio/"+ViewModel.PortfolioId+"/stock");
                    },function (err) {
                        ViewModel.Error = "Unable to update the Stock";
                    });
            }
            else{
                ViewModel.Error = "Please fill the highlighted fields"
            }
        }
    }
})();

