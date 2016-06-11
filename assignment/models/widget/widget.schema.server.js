/**
 * Created by PriyaArun on 6/8/16.
 */
module.exports = function () {
    var moongose = require('mongoose');
    var WidgetSchema = moongose.Schema({
        _page: {type: moongose.Schema.ObjectId, ref: "Page"},
        widgetType: {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT','TEXT']},
        name : String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        order: String,
        dateCreated: {type: Date, default: Date.Now}
    }, {collection: "wam.widget"});
    return WidgetSchema;
};