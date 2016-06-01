/**
 * Created by PriyaArun on 6/1/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($location, $routeParams, FlickrService) {
    var ViewModel = this;
        ViewModel.searchPhotos = searchPhotos;
        
        function searchPhotos(searchText) {
            FlickrService
                .searchPhotos(searchText)
                .then(function (response) {
                    var data = response.data.replace("jsonFlickrApi(","");
                    data = data.substring(0,data.length - 1);
                    data = JSON.parse(data);
                    ViewModel.Photos = data.photos;
                })
        }

    }
})();


