app.service("RoomService", ["$http", function ($http) {

    var serv = this;

    serv.getRooms = function () {

        return new Promise(function (resolve, reject) {
            var config = {
                method: "GET",
                url: "https://chat.hasenpower.io/rooms"
            };

            $http(config).then(function (response) {
                resolve(response.data);
            }, function (error) {
                console.error(error);
            })
        });
    }
}]);