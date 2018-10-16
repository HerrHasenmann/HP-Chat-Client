app.component("toolbar", {
    templateUrl: "./components/toolbar/toolbarTemplate.html",
    controller: ["$mdSidenav", "RoomService", ToolbarController]
});

function ToolbarController($mdSidenav, RoomService) {

    var ctrl = this;

    ctrl.openSidenav = function () {
        $mdSidenav("left").open();
    };

    ctrl.getActiveRoom = RoomService.getActiveRoom;

    ctrl.leaveRoom = RoomService.leaveRoom;

    ctrl.getTitle = function () {
        var activeRoom = RoomService.getActiveRoom();
        if (activeRoom) {
            return activeRoom.room.name;
        } else {
            return "HP-Chat"
        }
    }
}