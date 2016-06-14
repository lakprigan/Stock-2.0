/**
 * Created by PriyaArun on 6/1/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("HomeController", HomeController);

    function HomeController(QuandlService) {
        var vm = this;
        init();

        function init() {
        QuandlService.getStockData("NASDAQOMX")
        .then(function (response) {
                var data = [];
                _.forEach(response.data.dataset.data, function (day) {
                    data.push([
                        new Date(day[0]).getTime(),
                        day[1]
                    ]);
                })
                _.reverse(data);
                $('#nasdaqContainer').highcharts('StockChart', {
                    rangeSelector: {
                        selected: 1
                    },
                    title: {
                        text: 'NASDAQ'
                    },
                    series: [{
                        name: 'NASDAQ',
                        data: data,
                        tooltip: {
                            valueDecimals: 2
                        }
                    }]
                });

            }, function (err) {
              console.log("error");
            });
        }
    }
})();
