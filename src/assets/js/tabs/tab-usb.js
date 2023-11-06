import {SetSessionNotification} from "../functions/notifications.js";

$('#form-usb').parsley();

$("#form-usb").on('submit', function (e) {
    e.preventDefault();

    const form = $(this)
    const btn = form.find('button[type=submit]')

    const mode = $('#usbMode').val();
    const node = $('#usbNode').val();

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
            setTimeout(()=>{
                SetSessionNotification("urlerr");
            },300)
        },
        success: function (uStr) {
            var json = JSON.parse(uStr);
            setTimeout(()=>{
                SetSessionNotification(json);
            },300)
        },
        complete: function () {
            setTimeout(()=>{
                btn.removeClass('loading')
            },300)
        }
    })

});