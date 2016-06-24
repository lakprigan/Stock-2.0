/**
 * Created by PriyaArun on 6/18/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("PortfolioNewController", PortfolioNewController);

    function PortfolioNewController($location, $routeParams, PortfolioService, $rootScope) {
        var ViewModel = this;

        Initialize();
        function Initialize() {
            ViewModel.UserId = $rootScope.currentUser._id;
            ViewModel.PortfolioId = $routeParams.wid;
            ViewModel.SubmittedClass = "";
            ViewModel.CreateNewPortfolio = CreateNewPortfolio;
        }

        function CreateNewPortfolio(portfolio) {
            ViewModel.SubmittedClass = "submitted";
            if(portfolio.name){
                PortfolioService
                    .CreateNewPortfolio(ViewModel.UserId, portfolio)
                    .then(function (res) {
                        $location.url("/user/"+ViewModel.UserId+"/portfolio");
                    },function (err) {
                        ViewModel.Error = "Unable to create a new portfolio";
                    });
            }
            else{
                ViewModel.Error="Please enter the highlighted fields"
            }}
    }
})();
