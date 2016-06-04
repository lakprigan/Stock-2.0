/**
 * Created by PriyaArun on 6/1/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($location, $routeParams, FlickrService, WidgetService) {
    var ViewModel = this;
        ViewModel.searchPhotos = searchPhotos;
        ViewModel.selectPhoto = selectPhoto;
        ViewModel.PageId = $routeParams.pid;
        ViewModel.UserId = $routeParams.uid;
        ViewModel.WebsiteId = $routeParams.wid;
        ViewModel.WidgetId = $routeParams.wgid;

        WidgetService
            .FindWidgetById(ViewModel.WidgetId)
            .then(function (res) {
                ViewModel.Widget  = res.data;
            });

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

        function selectPhoto(photo) {
            ViewModel.Widget.url = "https://farm"+photo.farm+".staticflickr.com/"+photo.server+"/"+photo.id+"_"+photo.secret+"_m.jpg";
            WidgetService
                .UpdateWidget(ViewModel.WidgetId, ViewModel.Widget)
                .then(function (res) {
                    $location.url("/user/"+ViewModel.UserId+"/website/"+ViewModel.WebsiteId+"/page/"+ViewModel.PageId+"/widget");
                },function (err) {
                    ViewModel.Error = "Unable to update the Website";
                });
        }

    }
})();


