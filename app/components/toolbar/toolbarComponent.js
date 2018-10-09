app.component("toolbar", {
    templateUrl: "./components/toolbar/toolbarTemplate.html",
    controller: ["$mdSidenav", ToolbarController]
});

function ToolbarController($mdSidenav) {

    var ctrl = this;

    ctrl.openSidenav = function () {
        $mdSidenav("left").open();
    }
}