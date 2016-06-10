/**
 * Created by PriyaArun on 6/7/16.
 */
module.exports = function () {
    var models = {
        UserModel: require("./user/user.model.server") (),
        WebsiteModel: require("./website/website.model.server")(),
        PageModel: require("./page/page.model.server")(),
        WidgetModel: require("./widget/widget.model.server")()
    }
    return models;
};