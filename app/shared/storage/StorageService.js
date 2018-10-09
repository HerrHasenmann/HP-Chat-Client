app.factory("$storage", [function () {

    return {
        get: function (key) {
            var json = localStorage.getItem(key);
            if (json) {
                return JSON.parse(json);
            } else {
                return null;
            }
        },

        set: function (key, item) {
            return localStorage.setItem(key, JSON.stringify(item))
        },

        remove: function (key) {
            return localStorage.removeItem(key)
        }
    }
}]);