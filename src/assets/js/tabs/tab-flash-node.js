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

form.on('submit', function(event) {
    event.preventDefault();

    // Block the button
    submitBtn.prop("disabled", true);

    swal({
        title: "Do you want to continue?",
        content: {
            element: "div",
            attributes: {
                innerHTML: `
                   <p>You are about to overwrite a new image to the selected node.</p>
                `
            },
        },
        icon: "warning",
        dangerMode: true,
        closeOnClickOutside: false,
        buttons: {
            cancel: {
                text: "Cancel",
                value: null,
                visible: true,
                className: "btn btn-turing-small-dark",
                closeModal: true,
            },
            confirm: {
                text: "Continue",
                value: true,
                visible: true,
                className: "continue-btn btn btn-turing-small-yellow",
                closeModal: true,
            }
        },
    }).then((confirmed) => {
        if (!confirmed) {
            return;
        }

        return upload_multipart_action("#node-upgrade-form", update_label, progressBarGroup, "flash");
    }).finally(() => {
        submitBtn.prop("disabled", false);
    });

});

// Submit
const update_label = form.find('.update-text')
const progressBarGroup = form.find('.progress-bar-group')

