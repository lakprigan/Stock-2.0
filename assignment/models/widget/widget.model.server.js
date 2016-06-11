/**
 * Created by PriyaArun on 6/8/16.
 */
module.exports = function () {
    var mongoose = require('mongoose');
    var WidgetSchema = require("./widget.schema.server.js")();
    var Widget = mongoose.model("Widget", WidgetSchema);

    var api = {
        FindAllWidgetsForPage: FindAllWidgetsForPage,
        CreateWidget: CreateWidget,
        FindWidgetById: FindWidgetById,
        UpdateWidget: UpdateWidget,
        DeleteWidget: DeleteWidget,
        ReorderWidgets: ReorderWidgets

    }
    return api;

    function FindAllWidgetsForPage(pageId) {
        return Widget.find({"_page": pageId});
    }

    function CreateWidget(pageId, widget) {
        widget._page = pageId;
        return Widget.create(widget);
    }

    function FindWidgetById(widgetId) {
        return Widget.findById({"_id": widgetId});
    }

    function UpdateWidget(widgetId, widget) {
        delete widget._id;
        return Widget.update({"_id": widgetId}, widget);
    }

    function DeleteWidget(widgetId) {
        return Widget.remove({"_id": widgetId});
    }

    function ReorderWidgets(pageId, start, end) {
        return Widget.find({"_page": pageId}).then(
            function (widgets) {
                widgets.forEach(function (widget) {
                    if (start > end) {
                        if (widget.order >= end && widget.order < start) {
                            widget.order = parseInt(widget.order) + 1 + "";
                            widget.save(function () {
                            });
                        }
                        else if (widget.order === start) {
                            widget.order = end;
                            widget.save(function () {
                            });
                        }

                    }
                    else {
                         if (widget.order > start && widget.order <= end) {
                            widget.order = parseInt(widget.order) - 1 + "";
                            widget.save(function () {
                            });
                        }
                        else
                         if (widget.order === start) {
                             widget.order = end;
                             widget.save(function () {
                             });
                         }
                    }
                });
                res.send(200);
            }
        );

    }
}
