function get_request_handle(request_url) {
    return new Promise(function (resolve) {
        $.ajax({
            url: request_url,
            type: 'GET',
            timeout: 5000,
            dataType: "json",
            success: function (data) {
                resolve(data["handle"]);
            }
        });
    });
}

function get_status(type) {
    return new Promise(function (resolve, reject) {
        var request_status = '/api/bmc?opt=get&type=' + type;
        $.ajax({
            url: request_status,
            type: 'GET',
            dataType: "json",
            success: function (data) {
                if ("Error" in data) {
                    reject(data["Error"]);
                } else {
                    resolve(data);
                }
            },
            error: function (error) {
                reject(error);
            },
        });
    });
}

function multipart_transfer(handle, form_data, progressBar) {
    return new Promise(function (resolve, reject) {
        $.ajax({
            url: "/api/bmc/upload/" + handle,
            type: 'POST',
            data: form_data,
            processData: false,
            contentType: false,
            error: function (jqXHR, textStatus, errorThrown) {
                reject(jqXHR.responseText);
            },
            success: function (data) {
                resolve(data);
            },
            xhr: function () {
                const xhr = new XMLHttpRequest();
                // Add a progress callback for upload
                xhr.upload.addEventListener("progress", function (e) {
                    if (e.lengthComputable) {

                        setTimeout(() => {
                            const percentComplete = (e.loaded / e.total) * 100;


                            // Width of progressbar
                            progressBar.css({width: `${percentComplete}%`});

                            // Caption of progressbar
                            progressBar.text(`${percentComplete}%`)


                            console.log("Upload progress: " + percentComplete + "%");
                        }, 100)


                    }
                }, false);

                return xhr;
            }
        });
    });
}

const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

async function wait_for_state(type, need_state) {
    let state = await get_status(type);
    while (!(need_state in state)) {
        await sleep(1000);
        console.log(state);
        state = await get_status(type);
    }
    return state;
}

async function upload_multipart_action(form, update_label, progressBarGroup, type) {
    const progressBar = progressBarGroup.find('.progress-bar')

    $(form).on("submit", function (event) {
        event.preventDefault();

        progressBarGroup.addClass('active')

        var request_transfer;

        var file = $(form).find('input[type=file]')[0].files[0];

        if (type === "flash") {
            var node = $("#node-upgrade-picker").val();
            request_transfer = '/api/bmc?opt=set&type=flash&file=' + file.name + '&length=' + file.size + '&node=' + node;
        } else if (type === "firmware") {
            request_transfer = '/api/bmc?opt=set&type=firmware&file=' + file.name + '&length=' + file.size
        } else {
            alert(type + " is not a option");
        }

        get_request_handle(request_transfer).then(function (handle) {
            var formData = new FormData();
            formData.append('file', file);
            update_label.text("Transfering..");
            return multipart_transfer(handle, formData, progressBar);
        }).then(function () {
            update_label.text("verify checksum, and finalizing upgrade..");
            return wait_for_state(type, "Done");
        }).then(function () {
            update_label.text("Upgrade completed successful!");
        }).catch(function (err) {
            try {
                console.log("komaam");
                let error = wait_for_state(type, "Error");
            } catch (error) {
                update_label.text("Upgrade failed: " + error["Error"]);
            }

            update_label.text("Upgrade failed: " + err);
        });
    });
}


export {get_request_handle, get_status, multipart_transfer, sleep, wait_for_state, upload_multipart_action}
