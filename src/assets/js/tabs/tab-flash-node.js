import {upload_multipart_action} from "../functions/fileUploadFunctions.js";
import Cookies from 'js-cookie';

const form = $('#node-upgrade-form')
form.parsley();

const fileInput = form.find('input[type=file]')
const textInput = form.find('input[type=text]')
const submitBtn = form.find('button[type=submit]')


// Submit Button Change
textInput.on('input', function () {
    if ($(this).val()) {
        submitBtn.prop("disabled", false);
    } else {
        submitBtn.prop("disabled", true);
    }
});

fileInput.on('change', function () {
    if (fileInput[0].files.length > 0) {
        submitBtn.prop("disabled", false);
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
    }).catch((error) => {
        console.log(error);
    }).finally(() => {
        submitBtn.prop("disabled", false);
    });

});

// Submit
const update_label = form.find('.update-text')
const progressBarGroup = form.find('.progress-bar-group')

$("#skipCrc").change(function() {
    if($(this).is(":checked") && !Cookies.get('is_warned_on_crc_skip')) {
        swal({
            title: "Warning",
            content: {
                element: "div",
                attributes: {
                    innerHTML: `
                   <p>Disabling this option will speed up the transfer, but any occurences of data corruption cannot be detected.</p>
                   <p>Use this option only if you have alternative means to verify the integrity of the written image.</p>
                `
                },
            },
            icon: "warning",
            dangerMode: true,
            closeOnClickOutside: false,
            buttons: {
                confirm: {
                    text: "Ok",
                    value: true,
                    visible: true,
                    className: "continue-btn btn btn-turing-small-yellow",
                    closeModal: true,
                }
            },
        }).then(() => {
            Cookies.set('is_warned_on_crc_skip', true, { expires: null });
        });
    }
});
