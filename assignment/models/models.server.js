/**
 * Created by PriyaArun on 6/7/16.
 */
module.exports = function () {

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/wam');

    var models = {
        UserModel: require("./user/user.model.server") (),
        WebsiteModel: require("./website/website.model.server")()
    }
    return models;
};