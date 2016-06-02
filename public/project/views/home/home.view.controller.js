/**
 * Created by PriyaArun on 6/1/16.
 */
(function () {
    angular
        .module("StockWatch")
        .controller("HomeController",homeController);

    function homeController() {
        var vm = this;

        function init() {
            vm.slickConfig = {
                enabled: true,
                autoplay: true,
                draggable: false,
                autoplaySpeed: 3000,
                method: {},
                event: {
                    beforeChange: function (event, slick, currentSlide, nextSlide) {
                    },
                    afterChange: function (event, slick, currentSlide, nextSlide) {
                    }
                }
            };
            vm.number = [{label: 1}, {label: 2}, {label: 3}, {label: 4}, {label: 5}, {label: 6}, {label: 7}, {label: 8}];
            vm.numberLoaded = true;
            vm.numberUpdate = function(){
                vm.numberLoaded = false; // disable slick

                //number update

                vm.numberLoaded = true; // enable slick
            };
        }

        init();
        
        function getFeeds() {
            
        }
    }
})();
