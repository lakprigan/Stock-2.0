/**
 * Created by PriyaArun on 6/9/16.
 */
module.exports=function () {
    var mongoose = require("mongoose");

    var RecommendationSchema = mongoose.Schema({
        code : String,
        action: {type: String, enum:["Buy", "Sell"]},
        advisedBy: String,
        adviceDate: {type: Date, default: Date.now()}
    }, {collection: 'sw.recommendation'});

    return RecommendationSchema;
}