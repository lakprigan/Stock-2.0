/**
 * Created by PriyaArun on 6/3/16.
 */
(function () {
    angular
        .module("WebAppMaker")
        .directive("jgaSortable",jgaSortable);

    function jgaSortable() {
        var start;
        var end;
        function link(scope, element, attributes) {
            var jgaAxis = attributes.axis;
            var jgaHandle = attributes.handle;
            $(element).sortable({
                axis: jgaAxis,
                handle: jgaHandle,
                start: function (event, ui) {
                    start = ui.item.index();
                },
                stop:function (event,ui) {
                    end = ui.item.index();
                    var temp = scope.model.Widgets[start];
                    scope.model.Widgets[start] = scope.model.Widgets[end];
                    scope.model.Widgets[end] = temp;
                    scope.$apply();
                }
            });

        }
        return{
            link : link
    }
    }
})();