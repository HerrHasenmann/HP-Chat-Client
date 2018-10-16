app.service("RoomService", ["$http", "$interval", "UserService", function ($http, $interval, UserService) {

    var serv = this;
    var activeRooms = {};
    var activeRoom = null;
    var rooms = [];

    serv.getRooms = function () {
        return rooms;
    };

    serv.createRoom = function (name) {

        return new Promise(function (resolve, reject) {
            var config = {
                method: "POST",
                url: "https://chat.hasenpower.io/rooms/" + name
            };

            $http(config).then(function (response) {
                resolve(response.data)
            }, function (error) {
                console.log(error);
                reject(error);
            })
        });
    };

    serv.joinRoom = function (room) {

        var newActiveRoom = null;

        if(Object.keys(activeRooms).indexOf(room.name) === -1){
            newActiveRoom = setupRoom(room);
            activeRooms[room.name] = newActiveRoom;
        } else {
            newActiveRoom = activeRooms[room.name];
        }

        activeRoom = newActiveRoom.room.name;
    };

    serv.leaveRoom = function () {

        activeRooms[activeRoom].ws.close();

        activeRoom = null;
    };

    serv.roomNameExists = function (name) {

        return new Promise(function (resolve, reject) {
            var config = {
                method: "HEAD",
                url: "https://chat.hasenpower.io/rooms/" + name
            };

            $http(config).then(function () {
                resolve(true);
            }, function () {
                resolve(false);
            })
        });
    };

    function setupRoom(room) {
        var user = UserService.getUser();
        var ws = new WebSocket("wss://chat.hasenpower.io/rooms/" + room.name + "/join/" + user.uuid);

        var newRoom = {
            ws: ws,
            send: function (messageText) {
                ws.send(messageText)
            },
            messages: [],
            room: room
        };

        ws.onmessage = function (messageEvent) {
            newRoom.messages.push(JSON.parse(messageEvent.data));
        };

        ws.onclose = function () {
            delete activeRooms[room.name];
            if(activeRoom === newRoom){
                activeRoom = null;
            }
        };

        return newRoom;
    }

    serv.getActiveRooms = function () {
        return activeRooms;
    };
    
    serv.getActiveRoom = function () {
        return activeRooms[activeRoom]
    };
    
    function init() {
        refreshRooms();

        $interval(function () {
            refreshRooms();
        }, 3000)
    }
    init();

    function refreshRooms() {

        var config = {
            method: "GET",
            url: "https://chat.hasenpower.io/rooms"
        };

        $http(config).then(function (response) {
            var newRooms = response.data;

            angular.forEach(newRooms, function (newRoom) {
                var room = getRoomByName(newRoom.name);
                if (room) {
                    room.users = newRoom.users;
                } else {
                    rooms.push(newRoom);
                }
            })

        }, function (error) {
            console.error(error);
        });
    }

    function getRoomByName(name) {
        if (rooms) {
            return rooms.filter(function (room) {
                if (room.name === name) {
                    return true;
                }
            })[0]
        }
    }
    
}]);