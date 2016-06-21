/**
 * Created by PriyaArun on 6/21/16.
 */

module.exports = function () {
    var mongoose = require("mongoose");
    var stockDataSchema = mongoose.Schema({
        code: String,
        companyName: String
    },{collection: "sw.stockdata"});
    return stockDataSchema;
};