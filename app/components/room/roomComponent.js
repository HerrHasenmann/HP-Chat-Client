app.component("room", {
    templateUrl: "./components/room/roomTemplate.html",
    controller: ["$scope", "$interval", "$location", "$anchorScroll", RoomController],
    bindings: {
        data: "<"
    },
    bindToController: true
});

function RoomController($scope, $interval, $location, $anchorScroll) {

    var ctrl = this;

    ctrl.send = function (messageText) {
        ctrl.data.send(messageText);
        ctrl.data.messages.push({
            "timestamp": new Date().getTime(),
            "text": messageText,
            "sender": {
                "name": "You"
            }
        });
        ctrl.data.messageText = null;
    };

    ctrl.formatTime = function (timestamp) {
        return moment(timestamp).format("LLL");
    };

    ctrl.getMessageBackground = function (message) {
        var backgroundColor;
        switch (message.sender.name) {
            case "You":
                backgroundColor = "accent";
                break;
            case "Server":
                backgroundColor = "background-hue-1";
                break;
            default:
                backgroundColor = "primary";
        }

        return {
            "background": backgroundColor
        }
    };

    ctrl.getMessageStyle = function (message) {
        var style;
        switch (message.sender.name) {
            case "You":
                style = "flex-end";
                break;
            case "Server":
                style = "center";
                break;
            default:
                style = "flex-start";
        }

        return {
            "justify-content": style
        }
    };

    ctrl.$onInit = function () {
        $interval(function () {}, 200);

        $scope.$watch(function () {
            return ctrl.data.messages.length;
        }, function (messagesLength) {
            $location.hash(messagesLength - 1);
            $anchorScroll()
        })
    }
}