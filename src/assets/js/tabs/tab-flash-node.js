import {upload_multipart_action} from "../functions/fileUploadFunctions.js";

const form = $('#node-upgrade-form')
form.parsley();

const fileInput = form.find('input[type=file]')
const submitBtn = form.find('button[type=submit]')


// Submit Button Change
fileInput.on('change', function () {
    if (fileInput[0].files.length > 0) {
        submitBtn.prop("disabled", false);
    } else {
        submitBtn.prop("disabled", true);
    }
});


// Submit
const update_label = form.find('.update-text')
const progressBarGroup = form.find('.progress-bar-group')

upload_multipart_action("#node-upgrade-form", update_label, progressBarGroup, "firmware").then((r) => {

});

