app.service("UserService", ["$http", "$storage", function ($http, $storage) {

    var serv = this;

    serv.createUser = function (name) {
        var config = {
            method: "POST",
            url: "https://chat.hasenpower.io/users/" + name
        };

        $http(config).then(function (response) {
            $storage.set("user", response.data);
        }, function (error) {
            console.log(error);
        })
    };

    serv.userNameExists = function (name) {

        return new Promise(function (resolve, reject) {
            var config = {
                method: "HEAD",
                url: "https://chat.hasenpower.io/users/" + name
            };

            $http(config).then(function () {
                resolve(true);
            }, function () {
                resolve(false);
            })
        });
    };

    serv.getUser = function () {
        return $storage.get("user");
    }
}]);