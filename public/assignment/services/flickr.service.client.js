/**
 * Created by PriyaArun on 6/1/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService",FlickrService);

    var key = "dd876d88e55e0080e8e6f945dba58af8";
    var secret = "dd876d88e55e0080e8e6f945dba58af8";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";


    function FlickrService($http) {
        var api = {
            searchPhotos : searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }
    }
})();
