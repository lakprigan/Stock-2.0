/**
 * Created by PriyaArun on 6/9/16.
 */

module.exports = function () {
    var moongose = require('mongoose');
    var PortfolioSchema = moongose.Schema({
        _user: {type: moongose.Schema.ObjectId, ref: "User"},
        name : String,
        description: String,
        stocks: [{type:moongose.Schema.Types.ObjectId, ref: 'Stock'}],
        dateCreated: {type: Date, default: Date.Now}
    }, {collection: "sw.portfolio"});
    return PortfolioSchema;
};