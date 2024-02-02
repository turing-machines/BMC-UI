import {SetSessionNotification} from "../functions/notifications.js";
import {showToastNotification} from "../functions/notifications.js";
import {downloadFile} from "../functions/fileUploadFunctions.js";
import {ajaxFailToast} from "../app.js"

$("#form-network").submit(function (e) {
    e.preventDefault();

    const form = $(this)
    const btn = form.find('button[type=submit]')
    btn.addClass('loading');
    var url = window.API_ROOT+'api/bmc?opt=set&type=network&cmd=reset';

    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        cache: false,
    }).done((response) => {
        setTimeout(() => {
            showToastNotification('success', 'success');
        }, 300);
    })
    .fail(ajaxFailToast)
    .always(() => {
        btn.removeClass('loading')
    });
});

const backupForm = $("#form-storage");
const backupBtn = backupForm.find('button[type=submit]');

backupForm.on('submit', function(event) {
    event.preventDefault();
    backupBtn.addClass('loading');

    $.ajax({
        url:window.API_ROOT+"api/bmc/backup",
        xhrFields: {
            responseType: 'blob'
        },
    }).done((data, textStatus, jqXHR) => {
            let blob = new Blob([data]);
            console.log(jqXHR.getAllResponseHeaders());

            var regex = /filename="(.+?)"$/;
            var filename = regex.exec(jqXHR.getResponseHeader("content-disposition"))[1];
            downloadFile(blob, filename);

            setTimeout(() => {
                showToastNotification("received " + filename, 'success');
            }, 300);
        })
        .fail(ajaxFailToast)
        .always(() => {
            backupBtn.removeClass('loading');
        });
});
