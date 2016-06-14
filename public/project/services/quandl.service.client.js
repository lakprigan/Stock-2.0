/**
 * Created by PriyaArun on 6/13/16.
 */
/**
 * Created by PriyaArun on 6/1/16.
 */
(function () {
    angular
        .module("StockWatch")
        .factory("QuandlService",QuandlService);

    var key = "fzy3z1vDb8Tu9hxVz5R1";
    var urlBase = "https://www.quandl.com/api/v3/datasets/CODE/COMP.json?auth_token=API_KEY";


    function QuandlService($http) {
        var api = {
            getStockData : getStockData
        };
        return api;

        function getStockData(code) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("CODE", code);
            return $http.get(url);
        }
    }
})();
