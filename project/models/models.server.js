/**
 * Created by PriyaArun on 6/10/16.
 */
module.exports = function () {

    var models = {
        UserModel: require("./user/user.model.server")(),
        PortfolioModel: require("./portfolio/portfolio.model.server")(),
        StockModel: require("./stock/stock.model.server")(),
        CommentModel: require("./comment/comment.model.server")(),
        StockDataModel: require("./stockdata/stockdata.model.server")(),
        OpinionModel: require("./opinion/opinion.model.server")()
    }
    return models;
};