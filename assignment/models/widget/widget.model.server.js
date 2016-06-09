/**
 * Created by PriyaArun on 6/8/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        FindAllWidgetsForPage:FindAllWidgetsForPage,
        CreateWidget: CreateWidget,
        FindWidgetById: FindWidgetById

    }
    return api;

    function FindAllWidgetsForPage(pageId) {
        return Widget.find({"_id" : pageId});
    }
    function CreateWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }

}
