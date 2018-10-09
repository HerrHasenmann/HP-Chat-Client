app.factory("$clipboard", ["$mdToast", function ($mdToast) {

     function copyToClipboard(text) {
        var dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.setAttribute('value', text);
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
    }

    function showToast(toastText, text) {
        $mdToast.show({
            template:   "<md-toast>" +
                            "<md-icon style='margin: 0;' md-svg-icon='content-copy' md-colors='{fill: \"background-50\"}'></md-icon>" +
                            "<div layout='column' style='margin-left: 18px;'>" +
                                "<span>"+toastText+"</span>" +
                                "<span style='font-weight: bold'>"+text+"</span>" +
                            "</div>" +
                        "</md-toast>",
            position: "bottom right",
            hideDelay: 2000
        });
    }

    function CopyJob(text){

        var job = this;
        var $text = text;
        var $showToast = false;
        var $toastText = "Add to clipboard:";

        /**
         * If called a toast will display the copied content.
         *
         * @returns {$clipboard}
         */
        job.showToast = function () {
            $showToast = true;
            return job;
        };

        /**
         * Changes the text displayed in the Toast. Standard is 'Add to clipboard:' + added text.
         *
         * @param toastText
         * @returns {$clipboard}
         */
        job.toastText = function (toastText) {
            $toastText = toastText;
            return job;
        };

        /**
         * Executes the copy to the clipboard
         */
        job.build = function () {
            copyToClipboard($text);
            if($showToast){
                showToast($toastText, $text);
            }
        }
    }

    return {

        /**
         * Sets the content to copy to the clipboard.
         *
         * @param text
         * @returns {CopyJob}
         */
        copy: function (text) {
            return new CopyJob(text);
        }
    };
}]);