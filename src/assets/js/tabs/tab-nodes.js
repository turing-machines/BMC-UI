import {SetSessionNotification, showToastNotification} from "../functions/notifications.js";
import {ajaxFailToast} from "../app.js"
import {bool2int} from "../functions/functions.js";

// Prefetch Nodes Data
{

    $.ajax({
        url: window.API_ROOT + `api/bmc?opt=get&type=node_info`,
        type: 'GET',
        dataType: 'text',
        timeout: 5000,
        cache: false,
        beforeSend: function () {

        }
    })
        .fail(ajaxFailToast)
        .done((data) => {

            let json_result = JSON.parse(data);
            let nodes = json_result.response[0].result;

            $('.nodes-list').empty()
            $('.nodes-group__actions .actions-row').removeClass('skeleton-loading')

            nodes.forEach((node, index) => {
                const nodeId = index + 1;
                const module_name = node.module_name
                const name = node.name

                $('.nodes-list').append(`
                  <div data-node-id="${nodeId}" class="nodes-list__item">
                    <div class="nodes-list__item-inner">
                       
                        <div class="state-col">
                            <div class="state-indicator btn">
                                <div class="switch">
                                    <input data-node-id="${nodeId}" id="node-${nodeId}" type="checkbox" class="node-power" disabled>
                                    <label for="node-${nodeId}" class="switch-label">
                                        <span class="switch-btn"></span>
                                    </label>
                                </div>
                            </div>
                            
                            <button type="button" class="btn node-restart btn-turing-small-red" disabled >
                        <span class="caption">
                            Restart
                        </span>
                            </button>
                        </div>
                        
                        <div class="info-col">
                            <label class="input-wrap name">
                                <span class="label">Name</span>
                                <input type="text" value="${name}" data-field="name">
                            </label>
                            <label class="input-wrap module_name">
                                <span class="label">Module Name</span>
                                <input type="text" value="${module_name}" data-field="module_name">
                            </label>
                        </div>                        
                       
                    </div>
                </div>
                `)

            })

            $(document).trigger('reinit-inputs')

        })
}

// Node On/Off Event
$(document).on('change', '.node-power', function (e) {
    e.preventDefault();

    const checkbox = $(this);
    const btn = checkbox.parents('.state-indicator');
    const nodeItem = checkbox.parents('.nodes-list__item')
    const btnReload = nodeItem.find('.node-restart');
    const nodeID = nodeItem.attr('data-node-id')
    const newNodeState = bool2int(checkbox.prop('checked'));

    $.ajax({
        url: window.API_ROOT + `api/bmc?opt=set&type=power&node${nodeID}=${newNodeState}`,
        type: 'GET',
        dataType: 'text',
        timeout: 5000,
        cache: false,
        beforeSend: function () {
            btn.addClass('disabled')
            setTimeout(() => {
                btn.addClass('loading')
            }, 250)
        }
    })
        .fail(ajaxFailToast)
        .done(() => {

            if (newNodeState) {
                // On
                btnReload.attr('disabled', false)
            } else {
                // Of
                btnReload.attr('disabled', true)
            }


            setTimeout(() => {

                if (newNodeState) {
                    showToastNotification(`Node ${nodeID} has been turned on`, 'success');
                } else {
                    showToastNotification(`Node ${nodeID} has been turned off`, 'success');
                }

            }, 300);
        })
        .always(() => {
            setTimeout(() => {
                btn.removeClass('loading')
                btn.removeClass('disabled')
            }, 500);
        })


})

// Node Restart Event
$(document).on('click', '.node-restart', function (e) {
    e.preventDefault();

    const btn = $(this);
    const nodeItem = btn.parents('.nodes-list__item')

    let nodeID = nodeItem.attr('data-node-id')
    nodeID-=1

    $.ajax({
        url: window.API_ROOT + `api/bmc?opt=set&type=reset&node=${nodeID}`,
        type: 'GET',
        dataType: 'text',
        timeout: 5000,
        cache: false,
        beforeSend: function () {

            btn.addClass('loading')

        }
    })
        .fail(ajaxFailToast)
        .done(() => {
            setTimeout(() => {

                nodeID+=1;
                showToastNotification(`Node ${nodeID} has been restarted`, 'success');

            }, 300);
        })
        .always(() => {
            setTimeout(() => {
                btn.removeClass('loading')

            }, 300);
        })


})

// Edit Event
$(document).on('click', '.nodes-edit', function (e) {
    e.preventDefault();

    const btn = $(this);

    if ($('.nodes-list').hasClass('editing')) {
        // Cancel
        $('.nodes-list').removeClass('editing')
        btn.find('.caption').text('Edit')
        $('.node-power').prop('disabled', true)
    } else {
        // Enable Editing
        $('.nodes-list').addClass('editing')
        btn.find('.caption').text('Cancel')
        $('.node-power').prop('disabled', false)
    }
})

// Save Event
$(document).on('click', '.nodes-save', function (e) {
    e.preventDefault();

    const btn = $(this);
    $('.nodes-list').removeClass('editing')
    $('.nodes-edit').find('.caption').text('Edit')
    $('.node-power').prop('disabled', true)

    const node_info = {}

    $('.nodes-list .nodes-list__item').each(function (index) {
        const node = $(this)

        const nodeId = node.attr('data-node-id')
        const name = node.find('[data-field="name"]').val()
        const module_name = node.find('[data-field="module_name"]').val()

        node_info[`Node${nodeId}`] = {
            "name": name,
            "module_name": module_name
        };

    })


    $.ajax({
        url: window.API_ROOT + `api/bmc?opt=set&type=node_info`,
        type: 'POST',
        timeout: 5000,
        data: JSON.stringify(node_info),
        headers: {
            'Content-Type': 'application/json',
        },
        beforeSend: function () {

            btn.addClass('loading')

        }
    }).fail(ajaxFailToast)
        .done(() => {
            setTimeout(() => {
                showToastNotification(`Nodes were successfully updated.`, 'success');
            }, 300);
        })
        .always(() => {
            setTimeout(() => {
                btn.removeClass('loading')

            }, 300);
        })


})
