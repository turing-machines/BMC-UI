import {SetSessionNotification, showToastNotification} from "../functions/notifications.js";
import {ajaxFailToast} from "../app.js"

$('#form-usb').parsley();

$("#form-usb").on('submit', function (e) {
    e.preventDefault();

    const form = $(this)
    const btn = form.find('button[type=submit]')
    const mode = $('#usbMode').val();
    const node = $('#usbNode').val();
    const bootpin = $('#usbBoot').is(':checked');

    toggle_usb_boot_pin(bootpin, node);

    var url = `/api/bmc?opt=set&type=usb&mode=${mode}&node=${node}`;

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'text',
        timeout: 5000,
        cache: false,
        async: false,
        beforeSend: function () {
            btn.addClass('loading')
        },
        error: function (uStr) {
            console.log("ajax post error");
            setTimeout(() => {
                SetSessionNotification("urlerr");
            }, 300)
        },
        success: function (uStr) {
            var json = JSON.parse(uStr);
            setTimeout(() => {
                SetSessionNotification(json);
            }, 300)
        },
        complete: function () {
            setTimeout(() => {
                btn.removeClass('loading')
            }, 300)
        }
    })

});

function toggle_usb_boot_pin(enabled, node) {
    var usb_boot_url;
    if (enabled) {
        usb_boot_url = `/api/bmc?opt=set&type=usb_boot&node=${node}`;
    } else {
        usb_boot_url = `/api/bmc?opt=set&type=clear_usb_boot`;
    }

    $.ajax({
        url: usb_boot_url,
        type: 'GET',
        timeout: 5000,
        dataType: "json",
    }).fail(ajaxFailToast);
}
