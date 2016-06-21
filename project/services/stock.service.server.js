/**
 * Created by PriyaArun on 6/19/16.
 */
module.exports = function (app, models) {
    var stockModel = models.StockModel;

    app.post("/api/stockwatch/portfolio/:portfolioId/stock",CreateStock);
    app.get("/api/stockwatch/portfolio/:portfolioId/stock", FindAllStocksForPortfolio);
    app.get("/api/stockwatch/stock/:stockId",FindStockById);
    app.put("/api/stockwatch/stock/:stockId", UpdateStock);
    app.delete("/api/stockwatch/stock/:stockId", DeleteStock);

    function CreateStock(req, res) {
        var stock = req.body;
        var portfolioId =req.params.portfolioId;
        stockModel
            .CreateStock(portfolioId, stock)
            .then(function (stats) {
                res.send(200);
            },function (err) {
                res.statusCode(400).send(err);
            });
    }

    function FindAllStocksForPortfolio(req, res) {
        var portfolioId =req.params.portfolioId;
        stockModel
            .FindAllStocksForPortfolio(portfolioId)
            .then(function (stocks) {
                res.json(stocks);
            },function (err) {
                res.statusCode(404).send(err);
            });
    }

    function FindStockById(req, res) {
        var stockId = req.params.stockId;
        stockModel.FindStockById(stockId)
            .then(function (stock) {
                res.json(stock);
            },function () {
                res.statusCode(400).send(err);
            });

    }

    function UpdateStock(req, res) {
        var id = req.params.stockId;
        var stock = req.body;

        stockModel.UpdateStock(id, stock)
            .then(function (stat) {
                res.send(200);
            },function (err) {
                res.statusCode(404).send(err);
            });
    }

    function DeleteStock(req, res) {
        var id = req.params.stockId;
        stockModel.DeleteStock(id)
            .then(function (stat) {
                res.send(200);
            },function (err) {
                res.statusCode(404).send(err);
            });
    }

};
