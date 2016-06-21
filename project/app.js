/**
 * Created by PriyaArun on 6/9/16.
 */
module.exports= function (app){
    var models = require("./models/models.server.js")();
    require("./services/user.service.server.js")(app, models);
    require("./services/portfolio.service.server.js")(app, models);
    require("./services/stock.service.server.js")(app, models);
    require("./services/comment.service.server.js")(app, models);
    require("./services/stockdata.service.server.js")(app, models);
};
