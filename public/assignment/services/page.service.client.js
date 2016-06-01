/**
 * Created by PriyaArun on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);

    function PageService($http) {
        var api = {
            CreatePage : CreatePage,
            FindPageByWebsiteId: FindPageByWebsiteId,
            FindPageById: FindPageById,
            UpdatePage: UpdatePage,
            DeletePage: DeletePage
        };
        return api;

        function FindPageByWebsiteId(websiteId) {
            var url = "/api/website/"+websiteId+"/page";
            return $http.get(url);
        }
        
        function FindPageById(pageId) {
            var url = "/api/page/"+pageId;
            return $http.get(url);
        }

        function UpdatePage(pageId, newPage) {
            var url = "/api/page/"+pageId;
            return $http.put(url, newPage);
        }

        function CreatePage(websiteId, name, title) {
            var url = "/api/website/"+websiteId+"/page";
            var newPage = {
                _id: (new Date()).getTime()+"",
               name: name,
               title: title,
                websiteId: websiteId
            }
            return $http.post(url, newPage);
        }

        function DeletePage(pageId) {
            var url = "/api/page/:pageId";
            return $http.delete(url);
        }
    }
})();
