app.component("sidenav", {
    templateUrl: "./components/sidenav/sidenavTemplate.html",
    controller: ["$mdSidenav", "RouteService", SidenavController]
});

function SidenavController($mdSidenav, RouteService) {

    var ctrl = this;

    ctrl.routes = RouteService.getSidenavRoutes;
    ctrl.changeRoute = RouteService.setRoute;

    ctrl.getColorsForActive = function (route) {
        var activeRoute = RouteService.getRoute();
        if (route.id === activeRoute.id) {
            return "{background: 'background'}"
        }
    };

    ctrl.closeSidenav = function () {
        $mdSidenav("left").close();
    };
}