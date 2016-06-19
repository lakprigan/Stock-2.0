/**
 * Created by PriyaArun on 6/19/16.
 */
module.exports = function(app, models){

    var portfolioModel = models.PortfolioModel;
    app.post("/api/stockwatch/user/:userId/portfolio", CreatePortfolio);
    app.get("/api/stockwatch/user/:userId/portfolio", FindAllPortfoliosForUser);
    app.get("/api/stockwatch/portfolio/:portfolioId",FindPortfolioById);
    app.put("/api/stockwatch/portfolio/:portfolioId", UpdatePortfolio);
    app.delete("/api/stockwatch/portfolio/:portfolioId", DeletePortfolio);

    function CreatePortfolio(req, res) {
        var userId = req.params.userId;
        var portfolio = req.body;
        portfolioModel
            .CreatePortfolio(userId, portfolio)
            .then(function (stats) {
                res.send(200);
            },function (err) {
                res.statusCode(400).send(err);
            });
    }

    function FindAllPortfoliosForUser(req, res) {
        var userId = req.params.userId;
        portfolioModel
            .FindAllPortfoliosForUser(userId)
            .then(function (portfolios) {
                res.json(portfolios);
            },function (err) {
                res.statusCode(400).send(err);
            })
    }

    function FindPortfolioById(req, res) {
        var portfolioId = req.params.portfolioId;
        portfolioModel
            .FindPortfolioById(portfolioId)
            .then(function (portfolio) {
                res.json(portfolio);
            },function (err){
                res.statusCode(400).send(err);
            });
    }

    function UpdatePortfolio(req, res) {
        var id = req.params.portfolioId;
        var newPortfolio = req.body;
        portfolioModel
            .UpdatePortfolio(id, newPortfolio)
            .then(function (stats) {
                res.send(200);
            },function (err) {
                res.statusCode(404).send(err);
            });
    }

    function DeletePortfolio(req, res) {
        var id = req.params.portfolioId;
        portfolioModel
            .DeletePortfolio(id)
            .then(function (stats) {
                res.send(200);
            },function (err) {
                res.statusCode(404).send(err);
            })
    }
}
