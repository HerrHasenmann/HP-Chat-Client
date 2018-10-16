app.component("rooms", {
    templateUrl: "./components/rooms/roomsTemplate.html",
    controller: ["$mdSidenav", "$mdDialog", "$mdMedia", "RoomService", RoomsController]
});

function RoomsController($mdSidenav, $mdDialog, $mdMedia, RoomService) {

    var ctrl = this;

    ctrl.rooms = RoomService.getRooms;

    ctrl.getActiveRooms = RoomService.getActiveRooms;

    ctrl.getRoomIndicatorFill = function (room) {
        if (userIsInRoom(room)) {
            return {
                "fill": "accent"
            }
        } else {
            return {
                "fill": "background-A100"
            }
        }

    };

    ctrl.createRoom = function (event) {
        var dialogConfiguration = {
            controller: "CreateRoomDialogController",
            controllerAs: "$ctrl",
            templateUrl: './components/rooms/create-room-dialog/createRoomDialogTemplate.html',
            parent: angular.element(document.body),
            targetEvent: event,
            clickOutsideToClose: true,
            escapeToClose: true,
            fullscreen: $mdMedia("xs")
        };

        $mdDialog.show(dialogConfiguration).then(function (roomName) {

            RoomService.createRoom(roomName).then(function (room) {
                ctrl.joinRoom(room)
            })
        }, function () {
            //dialog was canceled
        })
    };

    ctrl.joinRoom = function (room) {
        closeSidenav();
        RoomService.joinRoom(room);
    };


    function closeSidenav() {
        $mdSidenav("left").close();
    }

    function userIsInRoom(room) {
        if (RoomService.getActiveRooms()[room.name]) {
            return true;
        }
    }
}