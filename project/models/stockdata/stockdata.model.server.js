/**
 * Created by PriyaArun on 6/21/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var StockDataSchema = require("./stockdata.schema.server.js")();
    var StockData = mongoose.model("StockData", StockDataSchema);

    var api = {
        FindMatchingStockData: FindMatchingStockData
    }
    return api;

    function FindMatchingStockData(companyName) {
        return StockData.find({'companyName': {$regex: companyName, $options: 'i'}});
    }
}