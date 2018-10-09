app.component("rooms", {
    templateUrl: "./components/rooms/roomsTemplate.html",
    controller: ["$rootScope", "RoomService", RoomsController]
});

function RoomsController($rootScope, RoomService) {

    var ctrl = this;

    ctrl.rooms = null;

    ctrl.$onInit = function () {
        RoomService.getRooms().then(function (rooms) {
            $rootScope.safeApply(function () {
                ctrl.rooms = rooms;
            })
        })
    }
}