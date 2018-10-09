/**
 * Created by Ich on 05.08.2018.
 */
app.directive("copy", [function () {
    return {
        restrict: "A",
        scope: {
            text: "@copy"
        },
        transclude: true,
        replace: true,
        template: "<div md-ink-ripple ng-transclude style='position: relative;'></div>",
        controller: ["$element", "$clipboard", CopyController],
        bindToController: true
    }
}]);

function CopyController($element, $clipboard) {

    var ctrl = this;

    ctrl.$onInit = function () {

        $element.bind("click", function (event) {

            event.stopPropagation();
            $clipboard.copy(ctrl.text).showToast().build();
        })
    }
}