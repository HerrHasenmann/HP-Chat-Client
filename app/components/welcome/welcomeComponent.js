app.component("welcome", {
    templateUrl: "./components/welcome/welcomeTemplate.html",
    controller: ["UserService", WelcomeController]
});

function WelcomeController(UserService) {

    var ctrl = this;

    ctrl.createUser = function (name) {
        if (name && ctrl.usernameForm.$valid) {
            UserService.createUser(name);
        }
    };

    ctrl.validateUsername = function (name) {

        UserService.userNameExists(name).then(function (existing) {

            console.log(existing);
            if (existing) {
                //invalid
                ctrl.usernameForm["usernameInput"].$setValidity("existing", false);
            } else {
                //valid
                ctrl.usernameForm["usernameInput"].$setValidity("existing", true);
            }
        });

    }
}