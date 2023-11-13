import {SetSessionNotification} from "../functions/notifications.js";
import {showToastNotification} from "../functions/notifications.js";
import {downloadFile} from "../functions/fileUploadFunctions.js";

$("#form-network").submit(function (e) {
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

const backupForm = $("#form-storage");
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
                downloadFile(blob, filename);

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
