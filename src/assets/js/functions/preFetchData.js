import {oth2bool} from "./functions.js";
import {humanize} from "humanize";

function preFetchTabsData() {
    preFetchSpecificTabData('usb');
    preFetchSpecificTabData('power');
    preFetchSpecificTabData('about');
    preFetchSpecificTabData('info');
}

function preFetchSpecificTabData(ltype) {
    let url = '';

    if (ltype === 'usb') {
        url = '/api/bmc?opt=get&type=usb';
    } else if (ltype === 'power') {
        url = '/api/bmc?opt=get&type=power';
    } else if (ltype === 'about') {
        url = '/api/bmc?opt=get&type=about';
    } else if (ltype === 'info') {
        url = '/api/bmc?opt=get&type=info';
    } else return;


    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'text',
        timeout: 5000,
        cache: false,
        error: function () {
            alert("page get error");

        },
        success: function (uStr) {
            var response = JSON.parse(uStr);
            var json = response["response"][0];

            if (ltype === 'usb') {
                FillDataOnUSBTab(json);
            } else if (ltype === 'about') {
                FillDataOnAboutTab(json.result);
            } else if (ltype === 'info') {
                FillDataOnInfoTab(json.result);
            } else if (ltype === 'power') {
                FillDataOnPowerTab(json);
            }
        }
    })
}

function FillDataOnInfoTab(json) {
    function row_template(label, item) {
        return `<div class="row">
                    <div class="col">${label}</div>
                    <div class="col">${item}</div>
                </div>`;
    }

    function progress_bar_template(total, free) {
        let used = total - free;
        let used_human = humanize.filesize(total - free);
        let total_human = humanize.filesize(total);
        let used_percentage = humanize.numberFormat((used * 100) / total);
        return `<div class="progress-bar-group form-group active">
            <div class="progress-bar-wrap">
                <div class="progress-bar loaded" style="width: ${used_percentage}%;">${used_human} / ${total_human}</div>
            </div>
        </div>`;
    }

    $.each(json.ip, function (index, item) {
        $("#tableNetworkInfo").append(row_template(item.device, ""));
        $("#tableNetworkInfo").append(row_template("ip", item.ip));
        $("#tableNetworkInfo").append(row_template("mac", item.mac));
    });

    $.each(json.storage, function (index, item) {
        let progress_bar = progress_bar_template(item.total_bytes, item.bytes_free);
        $("#tableStorageInfo").append(row_template(item.name, progress_bar));
    });
}

function FillDataOnAboutTab(json) {
    var version = json.version;
    var buildtime = json.buildtime;
    var buildver = json.build_version;
    var api = json.api;
    var buildroot = json.buildroot;

    $("#aboutVer,.daemon-version").text(version);
    $("#aboutBuildtime").text(buildtime);
    $("#aboutBuildVer").text(buildver);
    $("#aboutApi").text(api);
    $("#aboutBuildroot").text(buildroot);
}

function FillDataOnPowerTab(json) {
    function page_changeSwitchery(element, checked) {
        if ((element.is(':checked') && checked == false) || (!element.is(':checked') && checked == true)) {
            element.parent().find('.switchery').trigger('click');
        }
    }

    $.each(json, function (index, item) {
        var node1 = json[index][0].node1;
        var node2 = json[index][0].node2;
        var node3 = json[index][0].node3;
        var node4 = json[index][0].node4;

        var element1 = $('#node1Power').prop('checked', oth2bool(node1))
        var element2 = $('#node2Power').prop('checked', oth2bool(node2))
        var element3 = $('#node3Power').prop('checked', oth2bool(node3))
        var element4 = $('#node4Power').prop('checked', oth2bool(node4))
    });
}

function FillDataOnUSBTab(json) {
    $.each(json, function (index, item) {
        var mode = json[index][0].mode;
        var node = json[index][0].node;

        $('#usbMode').val(mode).selectric('refresh');
        $('#usbNode').val(node).selectric('refresh');

    });
}


export {preFetchTabsData, preFetchSpecificTabData}
