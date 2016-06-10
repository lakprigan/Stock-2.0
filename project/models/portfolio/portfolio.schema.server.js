/**
 * Created by PriyaArun on 6/9/16.
 */

module.exports=function () {
    var mongoose = require("mongoose");

    var PortfolioSchema = mongoose.Schema({
        code : String,
        investmentDate: {type: Date, default:Date.now},
        investmentPrice: String,
        investmentQuantity: String
    }, {collection: 'sw.portfolio'});

    return PortfolioSchema;
}