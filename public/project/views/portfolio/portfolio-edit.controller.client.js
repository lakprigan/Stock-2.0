/**
 * Created by PriyaArun on 6/19/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("PortfolioEditController", PortfolioEditController);

    function PortfolioEditController($location, $routeParams, PortfolioService) {
        var ViewModel = this;
        Initialize();

        function Initialize() {
            ViewModel.UserId = $routeParams.id;
            ViewModel.PortfolioId = $routeParams.pid;
            ViewModel.DeletePortfolio = DeletePortfolio;
            ViewModel.UpdatePortfolioById = UpdatePortfolioById;
            ViewModel.SubmittedClass = "";
            PortfolioService
                .FindPortfolioById(ViewModel.PortfolioId)
                .then(function (res) {
                    ViewModel.Portfolio = res.data;
                })
        }

        function DeletePortfolio() {
            PortfolioService
                .DeletePortfolio(ViewModel.PortfolioId)
                .then(function () {
                    $location.url("/user/"+ViewModel.UserId+"/portfolio");
                },function (error) {
                    ViewModel.error = "Unable to delete portfolio";
                });
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