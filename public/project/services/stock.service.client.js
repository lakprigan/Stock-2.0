/**
 * Created by PriyaArun on 6/19/16.
 */
/**
 * Created by PriyaArun on 5/29/16.
 */
(function () {
    angular
        .module("StockWatch")
        .factory("StockService", StockService);

    function StockService($http) {
        var api = {
            CreateStock: CreateStock,
            FindStocksByPortfolioId: FindStocksByPortfolioId,
            FindStockById: FindStockById,
            UpdateStock: UpdateStock,
            DeleteStock: DeleteStock
        };
        return api;

        function FindStocksByPortfolioId(portfolioId) {
            var url = "/api/stockwatch/portfolio/" + portfolioId + "/stock";
            return $http.get(url);
        }

        function FindStockById(stockId) {
            var url = "/api/stockwatch/stock/" + stockId;
            return $http.get(url);
        }

        function UpdateStock(stockId, stock) {
            var url = "/api/stockwatch/stock/" + stockId;
            return $http.put(url, stock);
        }

        function CreateStock(portfolioId, stock) {
            var url = "/api/stockwatch/portfolio/" + portfolioId + "/stock";
            return $http.post(url, stock);
        }

        function DeleteStock(stockId) {
            var url = "/api/stockwatch/stock/" + stockId;
            return $http.delete(url);
        }
    }
})();
