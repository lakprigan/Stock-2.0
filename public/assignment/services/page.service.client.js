/**
 * Created by PriyaArun on 5/29/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService",PageService);

    var Pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456" },
            { "_id": "432", "name": "Post 2", "websiteId": "456" },
            { "_id": "543", "name": "Post 3", "websiteId": "456" }
        ];

    function PageService() {
        var api = {
            CreatePage : CreatePage,
            FindPageByWebsiteId: FindPageByWebsiteId,
            FindPageById: FindPageById,
            UpdatePage: UpdatePage,
            DeletePage: DeletePage
        };
        return api;

        function FindPageByWebsiteId(websiteId) {
            var resultSet = [];
            for(var i in Pages){
                if(Pages[i].websiteId == websiteId){
                    resultSet.push(Pages[i]);
                }
            }
            return resultSet;
        }
        
        function FindPageById(pageId) {
            for(var i in Pages){
                if(Pages[i]._id == pageId){
                    return Pages[i];
                }
            }
            return null;
        }

        function UpdatePage(pageId, newPage) {
            for(var i in Pages){
                if(Pages[i]._id === pageId){
                    Pages[i].name = newPage.name;
                    Pages[i].title = newPage.title;
                    return true
                }
            }
            return false;
        }

        function CreatePage(websiteId, name, description) {
            var newPage = {
                _id: (new Date()).getTime()+"",
                name: name,
                websiteId: websiteId
            }
            Pages.push(newPage);
            return newPage;
        }

        function DeletePage(pageId) {
            for(var i in Pages){
                if(Pages[i]._id === pageId){
                    Pages.splice(i,1);
                    return true;
                }
            }
            return false;
        }
    }
})();
