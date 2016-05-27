/**
 * Created by PriyaArun on 5/26/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factor("WebsiteService",WebsiteService);

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
            FindWebsitesByUserId : FindWebsitesByUserId
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
    }
})
