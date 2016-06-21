/**
 * Created by PriyaArun on 6/8/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var stockSchema = mongoose.Schema({
        _portfolio:{type:mongoose.Schema.ObjectId, ref:"Portfolio"},
        code: String,
        investmentPrice: String,
        investmentQuantity: String,
        investmentDate : {type: Date, default: Date.Now},
        presentValue : String
    },{collection: "sw.stock"});
    return stockSchema;
};