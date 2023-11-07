import {SetSessionNotification, showToastNotification} from "../functions/notifications.js";

import {bool2int} from "../functions/functions.js";
import {rebootBMC} from "../functions/reboot.js";

$("#form-power").parsley();

$("#form-power").submit(function (e) {
    e.preventDefault();

    const form = $(this)
    const btn = form.find('button[type=submit]')

    var node1 = $('#node1Power').is(':checked');
    var node2 = $('#node2Power').is(':checked');
    var node3 = $('#node3Power').is(':checked');
    var node4 = $('#node4Power').is(':checked');

    node1 = bool2int(node1);
    node2 = bool2int(node2);
    node3 = bool2int(node3);
    node4 = bool2int(node4);

    var url = '/api/bmc?opt=set&type=power&node1=' + node1 + '&node2=' + node2 + '&node3=' + node3 + '&node4=' + node4 + '';

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


