/**
 * Created by PriyaArun on 6/7/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var WebsiteSchema = require("./website.schema.server.js")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        CreateWebsite: CreateWebsite,
        FindAllWebsitesForUser: FindAllWebsitesForUser,
        FindWebsiteById: FindWebsiteById,
        UpdateWebsite: UpdateWebsite,
        DeleteWebsite: DeleteWebsite
    }

    return api;

    function CreateWebsite(userId, website) {
        website._user = userId;
        return Website.create(website)
    }
    function FindAllWebsitesForUser(userId) {
        return Website.find({"_user": userId});
    }
    function FindWebsiteById(websiteId) {
        return Website.findById({"_id": websiteId});
    }
    function UpdateWebsite(websiteId, website) {
        return Website
            .update({"_id": websiteId},{
                $set:{
                    name: website.name,
                    description: website.description
                }
            });
    }
    function DeleteWebsite(websiteId) {
        return Website
            .remove({"_id": websiteId});
    }

}
