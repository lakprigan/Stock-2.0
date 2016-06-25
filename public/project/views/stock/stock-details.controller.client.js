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
                vm.code = vm.Stock.code;
                QuandlService.getStockData(vm.code)
                    .then(function (response) {
                        var data = [];
                        var volData = [];
                        vm.description = response.data.dataset.description;
                        vm.indexValue = response.data.dataset.data[0][1];
                        vm.high = response.data.dataset.data[0][2];
                        vm.low = response.data.dataset.data[0][3];
                        vm.totalMarketValue = "$"+response.data.dataset.data[0][5];
                        _.forEach(response.data.dataset.data, function (day) {
                            data.push([
                                new Date(day[0]).getTime(),
                                day[1]
                            ]);
                        })
                        _.reverse(data);
                        $('#chartContainer1').highcharts('StockChart', {
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
                        data = [];
                        _.forEach(response.data.dataset.data, function (day) {
                            data.push([
                                new Date(day[0]).getTime(),
                                day[1],
                                day[2],
                                day[3],
                                day[4]
                            ]);
                            volData.push([
                                new Date(day[0]).getTime(),
                                day[5]
                            ])
                        });

                        _.reverse(data);
                        _.reverse(volData);

                        $('#chartContainer2').highcharts('StockChart', {
                            rangeSelector: {
                                selected: 1
                            },
                            title: {
                                text: vm.code
                            },
                            yAxis: [{
                                labels: {
                                    align: 'right',
                                    x: -3
                                },
                                title: {
                                    text: 'O H L C'
                                },
                                height: '60%',
                                lineWidth: 2
                            }, {
                                labels: {
                                    align: 'right',
                                    x: -3
                                },
                                title: {
                                    text: 'Volume'
                                },
                                top: '65%',
                                height: '35%',
                                offset: 0,
                                lineWidth: 2
                            }],
                            series: [{
                                type: 'candlestick',
                                name: vm.code,
                                data: data,
                                tooltip: {
                                    valueDecimals: 2
                                }
                            }, {
                                type: 'column',
                                name: 'Volume',
                                data: volData,
                                yAxis: 1
                            }]
                        });

                    }, function (err) {
                        console.log("error");
                    });
            },function (err) {
                vm.Error = err.data;
            });
    }
})();
