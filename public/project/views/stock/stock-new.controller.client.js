/**
 * Created by PriyaArun on 5/29/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("StockNewController", StockNewController);

    function StockNewController($location, $routeParams, StockService, $rootScope) {
        var ViewModel = this;
        Initialize();
        function Initialize() {
            ViewModel.UserId = $rootScope.currentUser._id;
            ;
            ViewModel.PortfolioId = $routeParams.pid;
            ViewModel.StockId = $routeParams.sid;
            ViewModel.SubmittedClass = "";
            ViewModel.CreateStock = CreateStock;
        }

        function CreateStock(stock, code) {
            ViewModel.SubmittedClass = "submitted";
            if (!code || !stock) {
                ViewModel.Error = "Please enter the highlighted fields"
            }
            else {
                stock.code = code.originalObject.code;

                if (stock.code) {
                    stock.code = stock.code.replace("WIKI/", "");
                    StockService
                        .CreateStock(ViewModel.PortfolioId, stock)
                        .then(function (res) {
                            $location.url("/user/" + ViewModel.UserId + "/portfolio/" + ViewModel.PortfolioId + "/stock");
                        }, function (err) {
                            ViewModel.Error = "Unable to create a new Stock";
                        });

                }
                else {
                    ViewModel.Error = "Please enter the highlighted fields"
                }
            }
        }
    }
})();
