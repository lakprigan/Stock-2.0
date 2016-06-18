/**
 * Created by PriyaArun on 6/1/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("HomeController", HomeController);

    function HomeController(QuandlService) {
        var vm = this;
        vm.code = "NASDAQOMX";
        vm.getStockData = getStockData();
        getStockData();

        function getStockData() {
            QuandlService.getStockData(vm.code)
                .then(function (response) {
                    var data = [];
                    vm.indexValue = response.data.dataset.data[0][1];
                    vm.high = response.data.dataset.data[0][2];
                    vm.low = response.data.dataset.data[0][3];
                    vm.totalMarketValue = response.data.dataset.data[0][4];
                    _.forEach(response.data.dataset.data, function (day) {
                        data.push([
                            new Date(day[0]).getTime(),
                            day[1]
                        ]);
                    })
                    _.reverse(data);
                    $('#chartContainer').highcharts('StockChart', {
                        rangeSelector: {
                            selected: 1
                        },
                        title: {
                            text: vm.code
                        },
                        series: [{
                            name: vm.code,
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
