app.controller("RootController", ["$rootScope", "$mdMedia", "$storage", function ($rootScope, $mdMedia, $storage) {

    $rootScope.safeApply = function(fn) {
        var phase = this.$root.$$phase;
        if(phase === '$apply' || phase === '$digest') {
            if(fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
    };

    $rootScope.$mdMedia = $mdMedia;

    $rootScope.user = function () {
        var user = $storage.get("user");
        return user;
    }
}]);