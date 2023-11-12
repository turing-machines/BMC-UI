import {upload_multipart_action} from "../functions/fileUploadFunctions.js";
import {showToastNotification} from "../functions/notifications.js";
import {rebootBMC} from "../functions/reboot.js";
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

form.on("submit", function (event) {
    event.preventDefault();
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
        submitBtn.prop("disabled", true);
        return upload_multipart_action("#firmware-upgrade-form", update_label, progressBarGroup, "firmware")
            .then(() => {
                // The entire upload process was successful.
                console.log('Firmware Upgrade Finished');
                submitBtn.prop("disabled", false);
                return rebootBMC(true);
            });
    })
        .catch((error) => {
            // Handle errors here.
            console.error(error);
            submitBtn.prop("disabled", false);
            console.log('Firmware Upgrade Finished (Failed) ');

        });
});

const backupForm = $("#backup-form");
const backupBtn = backupForm.find('button[type=submit]');


backupForm.on('submit', function(event) {
    event.preventDefault();

    return new Promise((resolve, reject) => { 
        backupBtn.addClass('loading');
        $.ajax({
            url:"/api/bmc/backup",
            xhrFields: {
                responseType: 'blob'
            }
        }).done(
            function (data, textStatus, jqXHR) {
                let blob = new Blob([data]);
                console.log(jqXHR.getAllResponseHeaders());

                var regex = /filename="(.+?)"$/;
                var filename = regex.exec(jqXHR.getResponseHeader("content-disposition"))[1];

                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = filename; // Specify the desired file name
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setTimeout(() => {
                    showToastNotification("received " + filename, 'success');
                }, 300);
            })
            .fail(function (err) {
                console.log(err);
                setTimeout(() => {
                    showToastNotification("Error generating backup archive", 'error');
                    reject(err); // Reject the promise with the error
                }, 300);
            })
            .always(function() {
                backupBtn.removeClass('loading');
            });
    });
});
