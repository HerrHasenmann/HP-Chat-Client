app.factory("$object" ,[function () {

    /**
     * Utility method to get and set objects that may or may not exist
     *
     * @param splits
     * @param create
     * @param context
     * @returns
     */
    var objectifier = function(splits, create, context) {
        var result = context || window;
        for(var i = 0, s; result && (s = splits[i]); i++) {
            result = (s in result ? result[s] : (create ? result[s] = {} : undefined));
        }
        return result;
    };

    /**
     * Wrapped object with set, get, exist methods
     *
     * @param object
     * @returns {Object}
     */
    function object(object){

        var that = this;
        var $object = object;

        /**
         * Sets a value at the given path
         *
         * @param path dot seperated string e.g. foo.bar
         * @param value value to set
         * @returns result
         */
        that.set = function(path, value) {
            var splits = path.split('.'), s = splits.pop(), result = objectifier(splits, true, $object);
            return result && s ? (result[s] = value) : undefined;
        };

        /**
         * Gets a value at the given path
         *
         * @param path dot seperated string e.g. foo.bar
         * @param create if set path will be created with empty object
         * @return object at the given path
         */
        that.get = function(path, create) {
            return objectifier(path.split('.'), create, $object);
        };

        /**
         * Returns if a given path exists
         *
         * @param path dot seperated string e.g. foo.bar
         * @return boolean if path exists
         */
        that.exist = function(path) {
            return that.get($object, path, false) !== undefined;
        };

        return that;
    }

    return object;
}]);