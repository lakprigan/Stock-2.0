/**
 * Created by PriyaArun on 6/8/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    //mongodb has no notion of schema ,, this is at the application level
    var pageSchema = mongoose.Schema({
        _website:{type:mongoose.Schema.ObjectId, ref:"Website"},
        name: String,
        title: String,
        description: String,
        widgets: [],
        dateCreated : {type: Date, default: Date.Now}
    },{collection: "wam.page"});
    return pageSchema;
};