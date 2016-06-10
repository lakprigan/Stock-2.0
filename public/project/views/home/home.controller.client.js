/**
 * Created by PriyaArun on 6/1/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("HomeController",HomeController);

    function HomeController($http) {

        var self = this;
        // $http.get("http://d.yimg.com/aq/autoc?query=y&region=US&lang=en-US").then(function (res) {
        //     self.states = res.data;
        // },
        // function (err) {
        //     console.log("error");
        // });

        // $http({
        //     method: 'GET',
        //     url: 'http://d.yimg.com/aq/autoc?query=y&region=US&lang=en-US',
        //     jsonpCallback: 'jsonCallback',
        //     contentType: "application/json",
        //     dataType: 'jsonp'
        // }).then(function (res) {
        //     console.log(res);
        // })

        // $http.get("http://dev.markitondemand.com/MODApis/Api/v2/Lookup/json?input=a")
        //     .then(function (data) {
        //         console.log(data);
        //     },function (err) {
        //         console.log("err");
        //     });

        self.querySearch   = querySearch;

        function querySearch (query) {
            var url = "http://chstocksearch.herokuapp.com/api/" + query ;
            console.log("here");
        }

        function loadAll() {
            var allStates = 'Alabama, Alaska, Arizona, Arkansas, California, Colorado, Connecticut, Delaware,\
              Florida, Georgia, Hawaii, Idaho, Illinois, Indiana, Iowa, Kansas, Kentucky, Louisiana,\
              Maine, Maryland, Massachusetts, Michigan, Minnesota, Mississippi, Missouri, Montana,\
              Nebraska, Nevada, New Hampshire, New Jersey, New Mexico, New York, North Carolina,\
              North Dakota, Ohio, Oklahoma, Oregon, Pennsylvania, Rhode Island, South Carolina,\
              South Dakota, Tennessee, Texas, Utah, Vermont, Virginia, Washington, West Virginia,\
              Wisconsin, Wyoming';
            return allStates.split(/, +/g).map( function (state) {
                return {
                    value: state.toLowerCase(),
                    display: state
                };
            });
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }
        }
    })();
