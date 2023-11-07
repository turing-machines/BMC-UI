import {showToastNotification} from "./notifications.js";

function rebootBMC() {
    return new Promise((resolve, reject) => {
        $.get('/api/bmc?opt=set&type=reboot')
            .done(function (data) {
                setTimeout(() => {
                    showToastNotification("Restarting BMC..", 'success');
                    resolve(data); // Resolve the promise with the data
                }, 300);
            })
            .fail(function (err) {
                setTimeout(() => {
                    showToastNotification("Error when rebooting BMC", 'error');
                    reject(err); // Reject the promise with the error
                }, 300);
            });
    });
}

export {rebootBMC}


// Call Reboot function when click 'Reboot' button
$(document).on('click', ".reboot-btn", function () {
    const btn = $(this);
    btn.addClass('loading');

    rebootBMC()
        .then(() => {
            btn.removeClass('loading');

            swal.close()
        })
        .catch((error) => {
            // Handle any errors if needed
            console.error(error);
            btn.removeClass('loading');


            swal.close()
        });

});
