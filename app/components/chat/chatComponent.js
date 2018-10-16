app.component("chat", {
    templateUrl: "./components/chat/chatTemplate.html",
    controller: ["RoomService", ChatController]
});

function ChatController(RoomService) {

    var ctrl = this;

    ctrl.getActiveRoom = RoomService.getActiveRoom;
    ctrl.getActiveRooms = RoomService.getActiveRooms;
}