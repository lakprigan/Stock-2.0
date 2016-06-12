/**
 * Created by PriyaArun on 6/7/16.
 */
module.exports = function () {
    var Page = require('./page/page.schema.server')(mongoose);
    var moongose = require('mongoose');
    var WebsiteSchema = moongose.Schema({
        _user: {type: moongose.Schema.ObjectId, ref: "User"},
        name : String,
        description: String,
        pages: [Page],
        dateCreated: {type: Date, default: Date.Now}
    }, {collection: "wam.website"});
    return WebsiteSchema;
};