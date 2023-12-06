import {showToastNotification} from "./notifications.js";


function get_request_handle(request_url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: request_url,
            type: 'GET',
            timeout: 5000,
            dataType: "json",
        }).done(data => {
            resolve(data["handle"]);
        }).fail((xhr, textStatus, errorThrown) => {
            reject(ajax2Error(xhr, textStatus, errorThrown));
        });
    });
}

function get_status(type) {
    return new Promise((resolve, reject) => {
        var request_status = '/api/bmc?opt=get&type=' + type;
        $.ajax({
            url: request_status,
            type: 'GET',
            dataType: "json",
        }).done(data => {
            resolve(data);
        }).fail((xhr, textStatus, errorThrown) => {
            reject(ajax2Error(xhr, textStatus, errorThrown));
        });
    });
}

function ajax2Error(xhr, textStatus, errorThrown) {
    let msg = xhr.responseText;

    if (xhr.responseText === undefined) {
        msg = errorThrown;
    }

    let error = new Error(msg, { cause: xhr });
    error.name = textStatus;
    return error;
}

async function get_status_reject_on_error(type) {
    let state = await get_status(type);
    if ("Error" in state) {
        throw new Error(state["Error"]);
    }
    return state;
}

const sleep = (delay) => new Promise(resolve => setTimeout(resolve, delay))

async function wait_for_state(type, need_state) {
    let state = await get_status(type);
    while (!(need_state in state)) {
        await sleep(1000);
        console.log(state);
        state = await get_status(type);
    }
    return state;
}

async function get_transfer_progress(type) {
    let state = await get_status_reject_on_error(type);
    try {
        return {size: state["Transferring"].size, transfered: state["Transferring"].bytes_written};
    } catch (error) {
        throw new Error(`Internal Error: Expected state Transferring, got ${state}`, { cause: error });
    }
}

async function external_transfer(progressBar, type) {
        let progress = await get_transfer_progress(type);
        while (progress.transfered < progress.size) {
            await sleep(500);
            update_progress_bar(progressBar, progress.transfered, progress.size);
            progress = await get_transfer_progress(type);
        }
}

function update_progress_bar(progressBar, loaded, total) {
    const percentComplete = Number((loaded / total) * 100).toFixed(0);

    // Width of progressbar
    progressBar.css({width: `${percentComplete}%`});

    // Caption of progressbar
    progressBar.siblings('.progress-bar-caption').text(`${percentComplete}%`)

    console.log("Upload progress: " + percentComplete + "%");
}

function multipart_transfer(handle, form_data, progressBar) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: "/api/bmc/upload/" + handle,
            type: 'POST',
            data: form_data,
            processData: false,
            contentType: false,
            xhr: function () {
                const xhr = new XMLHttpRequest();
                // Add a progress callback for upload
                xhr.upload.addEventListener("progress", function (e) {
                    if (e.lengthComputable) {
                        setTimeout(() => {
                            update_progress_bar(progressBar, e.loaded, e.total);
                        }, 100)
                    }
                }, false);

                return xhr;
            }
        }).done(data => {
            resolve(data);
        }).fail((xhr, textStatus, errorThrown) => {
            reject(ajax2Error(xhr, textStatus, errorThrown));
        });
    });
}

function upload_multipart_action(form, update_label, progressBarGroup, type) {
    return new Promise((resolve, reject) => {
        const progressBar = progressBarGroup.find('.progress-bar');

        event.preventDefault();

        progressBarGroup.addClass('active');

        var label;
        var file = $(form).find('input[type=file]')[0].files[0];
        var text = $(form).find('input[type=text]').val();
        var url = '/api/bmc?opt=set&type=' + type;

        if (type === "flash") {
            var node = $("#node-upgrade-picker").val();
            url += '&node=' + node;
            if ($("#skipCrc").prop("checked")) {
                url += "&skip_crc";
            }
            label = "install";
        } else if (type === "firmware") {
            label = "upgrade";
        } else {
            progressBarGroup.removeClass('active');
            reject(new Error(type + " is not an option"));
            return;
        }

        let extern_transfer = false;
        if (file) {
            url += '&file=' + file.name + '&length=' + file.size;
        } else if (text) {
            extern_transfer = true;
            url += '&file=' + text;
            if (!text.startsWith("http://") && !text.startsWith("https://")) {
                url +='&local'
            }
        } else {
            progressBarGroup.removeClass('active');
            reject(new Error("could not parse input field"));
            return;
        }

        const sha256 = $(form).find(".upgrade-sha256").val();
        if (sha256) {
            url += '&sha256=' + sha256;
        }

        let transfer = get_request_handle(url);
        update_label.text("Transferring...");
        if (extern_transfer) {
            transfer = transfer.then((handle) => {return external_transfer(progressBar, type)});
        } else {
            transfer = transfer
                .then(function (handle) {
                    var formData = new FormData();
                    formData.append('file', file);
                    return multipart_transfer(handle, formData, progressBar);
                });
        }

        transfer
            .then(function () {
                update_label.text("Calculating CRC and finalizing " + label + "...");
                return wait_for_state(type, "Done");
            })
            .then(function () {
                update_label.text(label + " completed successfully!");
                showToastNotification('success', 'success');
                progressBar.addClass('loaded');
                resolve();
            })
            .catch((error) => {
                let server_error = error.name + ': ' + error.message;
                showToastNotification(label + ' failed!', 'error');
                update_label.text(server_error);
                reject(error);
            }).finally(() => {
                progressBar.addClass('loaded');
            });
    });
}

function downloadFile(blob, filename) {
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export {downloadFile,  upload_multipart_action}

