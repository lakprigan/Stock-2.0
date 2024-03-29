/**
 * Created by PriyaArun on 6/18/16.
 */
(function () {
    angular
        .module("StockWatch")
        .factory("PortfolioService",PortfolioService);

    function PortfolioService($http) {
        var api = {
            FindPortfoliosByUserId : FindPortfoliosByUserId,
            CreateNewPortfolio: CreateNewPortfolio,
            DeletePortfolio: DeletePortfolio,
            UpdatePortfolio: UpdatePortfolio,
            FindPortfolioById: FindPortfolioById
        };

        return api;

        function FindPortfoliosByUserId(userId) {
            var url = "/api/stockwatch/user/"+userId+"/portfolio";
            return $http.get(url);
        }

        function FindPortfolioById(portfolioId) {
            var url = "/api/stockwatch/portfolio/"+portfolioId;
            return $http.get(url);
        }

        function UpdatePortfolio(portfolioId, updatedPortfolio) {
            var url = "/api/stockwatch/portfolio/"+portfolioId;
            return $http.put(url, updatedPortfolio);
        }

        function CreateNewPortfolio(userId, newPortfolio) {

            var url = "/api/stockwatch/user/"+userId+"/portfolio";
            return $http.post(url, newPortfolio);
        }

        function DeletePortfolio(portfolioId) {
            var url = "/api/stockwatch/portfolio/" + portfolioId;
            return $http.delete(url);
        }
    }
})();
