/**
 * Created by PriyaArun on 6/1/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("StockDetailsController", StockDetailsController);

    function StockDetailsController($routeParams, QuandlService, StockService, $rootScope) {
        var vm = this;
        vm.UserId = $rootScope.currentUser._id;
        vm.PortfolioId = $routeParams.pid;
        vm.StockId= $routeParams.sid;
        StockService.FindStockById(vm.StockId)
            .then(function (res) {
                vm.Stock = res.data;
                QuandlService.getStockData(vm.Stock.code)
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
                                text: vm.Stock.code
                            },
                            series: [{
                                name: vm.Stock.code,
                                data: data,
                                tooltip: {
                                    valueDecimals: 2
                                }
                            }]
                        });
                    }, function (err) {
                        vm.Error = err.data;
                    });
            },function (err) {
                vm.Error = err.data;
            });
    }
})();
