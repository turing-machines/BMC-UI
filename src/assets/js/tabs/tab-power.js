import {SetSessionNotification, showToastNotification} from "../functions/notifications.js";
import {ajaxFailToast} from "../app.js"
import {bool2int} from "../functions/functions.js";
import {rebootBMC} from "../functions/reboot.js";

const form = $("#form-power");
const checkbox = form.find('input[type=checkbox]');

$("#form-power").parsley();

checkbox.change(function () {
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
    })
    .fail(ajaxFailToast)
    .done(() => {
        setTimeout(() => {
            showToastNotification('success', 'success');
        }, 300);
    });
});

$("#reboot-btn").on('click', function() {
    rebootBMC();
});

let backoff = false;

$("#reload-btn").on('click', () => {
    const btn = $(this);
    if (backoff) {
        return;
    }
    backoff = true;

    btn.addClass('loading');
    $.get('/api/bmc?opt=set&type=reload')
        .done(function (data) {
            setTimeout(() => {
                showToastNotification("BMC reloaded", 'success');
            }, 300);
        })
        .fail(ajaxFailToast)
        .always(() => {
            setTimeout(() => {
                btn.removeClass('loading');
            }, 1000);
            backoff = false;
        });
});
