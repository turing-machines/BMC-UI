import {SetSessionNotification} from "../functions/notifications.js";



$("#form-info").submit(function (e) {
    e.preventDefault();

    const form = $(this)
    const btn = form.find('button[type=submit]')
    btn.addClass('loading');
    var url = '/api/bmc?opt=set&type=network&cmd=reset';

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'text',
        cache: false,
        error: function (uStr) {
            console.log(uStr);
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
