/**
 * Created by PriyaArun on 6/7/16.
 */
module.exports = function () {
  var moongose = require('mongoose');
    var WebsiteSchema = moongose.Schema({
        _user: {type: moongose.Schema.ObjectId, ref: "User"},
        name : String,
        description: String,
        dateCreated: {type: Date, default: Date.Now}
    }, {collection: "wam.website"});
    return WebsiteSchema;
};