/**
 * Created by PriyaArun on 6/3/16.
 */
(function () {
    angular
        .module("jgaDirectives",[])
        .directive("jgaSortable",jgaSortable);

    function jgaSortable() {
        var start = 0;
        var end = 0;
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
                    scope.model.ReorderWidgets({start: start, end: end});
                    //scope.$apply();
                }
            });

        }
        return{
            link : link
    }
    }
})();