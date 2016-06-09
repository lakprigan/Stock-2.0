/**
 * Created by PriyaArun on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);

    function WebsiteService($http) {
        var api = {
            FindWebsitesByUserId : FindWebsitesByUserId,
            CreateNewWebsite: CreateNewWebsite,
            DeleteWebsite: DeleteWebsite,
            UpdateWebsite: UpdateWebsite,
            FindWebsiteById: FindWebsiteById
        };
        return api;

        function FindWebsitesByUserId(userId) {
            var url = "/api/user/"+userId+"/website";
            return $http.get(url);
        }

        function FindWebsiteById(websiteId) {
            var url = "/api/website/"+websiteId;
            return $http.get(url);
        }

        function UpdateWebsite(websiteId, updatedWebsite) {
            var url = "/api/website/"+websiteId;
            return $http.put(url, updatedWebsite);
        }

        function CreateNewWebsite(developerId, name, description) {
            var newWebsite = {
                name: name,
                description: description
            }
            var url = "/api/user/"+developerId+"/website";
            return $http.post(url, newWebsite);
        }

        function DeleteWebsite(webisteId) {
            var url = "/api/website/" + webisteId;
            return $http.delete(url);
        }
    }
})();
