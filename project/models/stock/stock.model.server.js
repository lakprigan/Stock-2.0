/**
 * Created by PriyaArun on 6/8/16.
 */
module.exports = function () {
    var mongoose = require("mongoose");
    var StockSchema = require("./stock.schema.server.js")();
    var Stock = mongoose.model("Stock", StockSchema);

    var api = {
        FindAllStocksForPortfolio: FindAllStocksForPortfolio,
        CreateStock: CreateStock,
        FindStockById: FindStockById,
        DeleteStock: DeleteStock,
        UpdateStock: UpdateStock
    }
    return api;
    
    function FindAllStocksForPortfolio(portfolioId) {
        return Stock.find({"_portfolio": portfolioId});
    }
    function CreateStock(portfolioId, stock) {
        stock._portfolio = portfolioId;
        return Stock.create(stock);
    }
    function FindStockById(stockId) {
        return Stock.findById({"_id" : stockId});
    }
    function UpdateStock(stockId, stock) {
        delete stock._id;
        return Stock.update({"_id": stockId},
            {
                $set : stock
            });
    }
    function DeleteStock(stockId) {
        return Stock.remove({"_id" : stockId});
    }
}