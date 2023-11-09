import {SetSessionNotification} from "../functions/notifications.js";



$("#form-info").submit(function (e) {
    e.preventDefault();

    const form = $(this)
    const btn = form.find('button[type=submit]')

    var url = '/api/bmc?opt=set&type=network&cmd=reset';

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
