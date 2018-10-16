app.controller("CreateRoomDialogController", ["$mdDialog", "RoomService", function ($mdDialog, RoomService) {

    var ctrl = this;

    ctrl.cancel = $mdDialog.cancel;
    
    ctrl.createRoom = function (roomName) {
        $mdDialog.hide(roomName);
    };

    ctrl.validateRoomName = function (roomName) {
        RoomService.roomNameExists(roomName).then(function (existing) {

            if (existing) {
                //invalid
                ctrl.roomNameForm["roomNameInput"].$setValidity("existing", false);
            } else {
                //valid
                ctrl.roomNameForm["roomNameInput"].$setValidity("existing", true);
            }
        });
    }
}]);