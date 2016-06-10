/**
 * Created by PriyaArun on 6/9/16.
 */
module.exports= function (app){
    var models = require("./models/models.server.js")();
    require("./services/user.service.server.js")(app, models);
};
