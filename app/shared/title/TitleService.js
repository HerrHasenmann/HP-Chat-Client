app.factory("$title", [function () {

    /**
     * Called without a parameter returns the current title. Called with a parameter will set the title.
     *
     * @param newTitle
     * @returns {string}
     */
    function title(newTitle){
        if(!arguments.length){
            return document.title;
        }else{
            document.title = newTitle;
        }
    }

    return title;
}]);