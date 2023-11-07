import {upload_multipart_action} from "../functions/fileUploadFunctions.js";
import swal from 'sweetalert';

const form = $('#firmware-upgrade-form')

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


await upload_multipart_action("#firmware-upgrade-form", update_label, progressBarGroup, "firmware")
    .then(() => {
        // The entire upload process was successful.
        console.log('Firmware Upgrade Finished');

        // Show Modal when Firmware Upgrade is successfully
        swal({
            title: "A reboot is required",
            content: {
                element: "div",
                attributes: {
                    innerHTML: `
                   <p>A reboot is required to finalise the upgrade.</p>
                   <p>Be aware that the nodes will lose power until booted.</p>
                   <p>Do you want to reboot now?</p>
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
                    text: "Reboot",
                    value: true,
                    visible: true,
                    className: "reboot-btn btn btn-turing-small-red",
                    closeModal: false
                }
            },
        })

    })
    .catch((error) => {
        // Handle errors here.
        console.error(error);
        console.log('Firmware Upgrade Finished (Failed) ');

    });