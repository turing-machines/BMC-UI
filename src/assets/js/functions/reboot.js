import {showToastNotification} from "./notifications.js";

function rebootBMC(upgrade_reboot) {
    let title;
    let icon;
    let inner;
    if (upgrade_reboot) {
        title = "Upgrade Finished!";
        icon= "success";
        inner= `<p>To complete the upgrade a reboot is required.</p>
                   <p>Be aware that the nodes will lose power until booted.</p>
                   <p>Do you want to reboot?<p>
            `;
    } else {
        title= "Do you want to reboot?";
        icon= "warning";
        inner=`
            <p>Be aware that the nodes will lose power until booted.</p>
           `;
    }

    swal({
        title: title,
        content: {
            element: "div",
            attributes: {
                innerHTML: inner,
            },
        },
        icon: icon,
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
}

export {rebootBMC}

// Call Reboot function when click 'Reboot' button
$(document).on('click', ".reboot-btn", function () {
    const btn = $(this);
    btn.addClass('loading');

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
    }).then(() => {
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
