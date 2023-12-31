import {upload_multipart_action} from "../functions/fileUploadFunctions.js";
import {rebootBMC} from "../functions/reboot.js";
import swal from 'sweetalert';

const form = $('#firmware-upgrade-form')

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

// Submit
const update_label = form.find('.update-text')
const progressBarGroup = form.find('.progress-bar-group')

form.on("submit", function (event) {
    event.preventDefault();

    // Block the button
    submitBtn.prop("disabled", true);

    swal({
        title: "Upgrade Firmware?",
        content: {
            element: "div",
            attributes: {
                innerHTML: `
                   <p>A reboot is required to finalise the upgrade process</p>
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
        return upload_multipart_action("#firmware-upgrade-form", update_label, progressBarGroup, "firmware");
    }).then(() => {
        // The entire upload process was successful.
        console.log('Firmware Upgrade Finished');
        return rebootBMC(true);
    }).catch((error) => {
        console.log(error);
    }).finally(() => {
        submitBtn.prop("disabled", false);
    });
});

