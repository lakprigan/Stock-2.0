/**
 * Created by PriyaArun on 6/10/16.
 */
module.exports = function () {
    
    var models = {
        UserModel: require("./user/user.model.server") (),
        PortfolioModel: require("./portfolio/portfolio.model.server") ()
    }
    return models;
};