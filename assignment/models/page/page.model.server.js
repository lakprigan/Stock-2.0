/**
 * Created by PriyaArun on 6/8/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        FindAllPageForWebsite: FindAllPageForWebsite,
        CreatePage: CreatePage,
        FindPageById: FindPageById,
        DeletePage: DeletePage,
        UpdatePage: UpdatePage
    }
    return api;
    
    function FindAllPageForWebsite(websiteId) {
        return Page.find({"_website": websiteId});
    }
    function CreatePage(websiteId, page) {
        page._website = websiteId;
        return Page.create(page);
    }
    function FindPageById(pageId) {
        return Page.findById({"_id" : pageId});
    }
    function UpdatePage(pageId, page) {
        return Page.update({"_id": pageId},
            {
                $set : {
                    name : page.name,
                    title : page.title
                }
            });
    }
    function DeletePage(pageId) {
        return Page.remove({"_id" : pageId});
    }
}