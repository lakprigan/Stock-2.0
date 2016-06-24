/**
 * Created by PriyaArun on 6/19/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("PortfolioEditController", PortfolioEditController);

    function PortfolioEditController($location, $routeParams, PortfolioService, $rootScope) {
        var ViewModel = this;
        Initialize();

        function Initialize() {
            ViewModel.UserId = $rootScope.currentUser._id;;
            ViewModel.PortfolioId = $routeParams.pid;
            ViewModel.UpdatePortfolioById = UpdatePortfolioById;
            ViewModel.SubmittedClass = "";
            PortfolioService
                .FindPortfolioById(ViewModel.PortfolioId)
                .then(function (res) {
                    ViewModel.Portfolio = res.data;
                })
        }

        function UpdatePortfolioById(updatedPortfolio) {
            ViewModel.SubmittedClass = "submitted";
            if(updatedPortfolio.name){
                PortfolioService
                    .UpdatePortfolio(ViewModel.PortfolioId, updatedPortfolio)
                    .then(function (res) {
                        $location.url("/user/"+ViewModel.UserId+"/portfolio");
                    },function (err) {
                        ViewModel.Error = "Unable to update the Portfolio";
                    });
            }
            else {
                ViewModel.Error = "Please enter the highlighted field"
            }
        }
    }
})();