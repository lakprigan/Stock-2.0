/**
 * Created by PriyaArun on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService",WebsiteService);

    var Websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    function WebsiteService() {
        var api = {
            FindWebsitesByUserId : FindWebsitesByUserId,
            CreateNewWebsite: CreateNewWebsite,
            DeleteWebsite: DeleteWebsite
        };
        return api;
function FindWebsitesByUserId(userId) {
var resultSet = [];
    for(var i in Websites){
        if(Websites[i].developerId == userId){
            resultSet.push(Websites[i]);
        }
    }
    return resultSet;
}

        function CreateNewWebsite(developerId, name, description) {
            var newWebsite = {
                _id: (new Date()).getTime()+"",
                name: name,
                description: description,
                developerId: developerId
            }
            Websites.push(newWebsite);
            return newWebsite;
        }

        function DeleteWebsite(webisteid) {
            for(var i in Websites){
                if(Websites[i]._id === webisteid){
                    Websites.splice(i);
                    return true;
                }
            }
            return false;
        }
    }
})();