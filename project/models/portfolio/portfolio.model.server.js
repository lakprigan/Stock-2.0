/**
 * Created by PriyaArun on 6/19/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var PortfolioSchema = require("./portfolio.schema.server.js")();
    var Portfolio = mongoose.model("Portfolio", PortfolioSchema);

    var api = {
        CreatePortfolio: CreatePortfolio,
        FindAllPortfoliosForUser: FindAllPortfoliosForUser,
        FindPortfolioById: FindPortfolioById,
        UpdatePortfolio: UpdatePortfolio,
        DeletePortfolio: DeletePortfolio
    }

    return api;

    function CreatePortfolio(userId, portfolio) {
        portfolio._user = userId;
        return Portfolio.create(portfolio);
    }
    
    function FindAllPortfoliosForUser(userId) {
        return Portfolio.find({"_user": userId});
    }
    function FindPortfolioById(portfolioId) {
        return Portfolio.findById({"_id": portfolioId});
    }
    function UpdatePortfolio(portfolioId, portfolio) {
        delete portfolio._id;
        return Portfolio
            .update({_id: portfolioId},{
                $set: portfolio
            });
    }
    function DeletePortfolio(id) {
        return Portfolio
            .remove({"_id": id});
    }

}
