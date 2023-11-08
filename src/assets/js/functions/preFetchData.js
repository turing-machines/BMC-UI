import {oth2bool} from "./functions.js";

function preFetchTabsData() {
    preFetchSpecificTabData('usb');
    preFetchSpecificTabData('sdcard');
    preFetchSpecificTabData('power');
    preFetchSpecificTabData('about');
}

function preFetchSpecificTabData(ltype) {
    let url = '';

    if (ltype === 'usb') {
        url = '/api/bmc?opt=get&type=usb';
    } else if (ltype === 'sdcard') {
        url = '/api/bmc?opt=get&type=sdcard';
    } else if (ltype === 'power') {
        url = '/api/bmc?opt=get&type=power';
    } else if (ltype === 'about') {
        url = '/api/bmc?opt=get&type=about';
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
            } else if (ltype === 'sdcard') {
                FillDataOnSDCardTab(json);
            } else if (ltype === 'about') {
                console.log(json);
                FillDataOnAboutTab(json.result);
            } else if (ltype === 'power') {
                FillDataOnPowerTab(json);
            }
        }
    })
}


function FillDataOnSDCardTab(json) {
    $.each(json, function (index, item) {
        var total = json[index][0].total;
        var use = json[index][0].use;
        var free = json[index][0].free;

        $("#sdTotal").val(total);
        $("#sdUse").val(use);
        $("#sdFree").val(free);
    });
}

function FillDataOnAboutTab(json) {
    console.log(json);
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

        var element1 = $('#node1Power');
        page_changeSwitchery(element1, oth2bool(node1));

        var element2 = $('#node2Power');
        page_changeSwitchery(element2, oth2bool(node2));

        var element3 = $('#node3Power');
        page_changeSwitchery(element3, oth2bool(node3));

        var element4 = $('#node4Power');
        page_changeSwitchery(element4, oth2bool(node4));
    });
}

function FillDataOnUSBTab(json) {
    $.each(json, function (index, item) {
        var mode = json[index][0].mode;
        var node = json[index][0].node;

        $('#usbMode').val(mode);
        $('#usbNode').val(node);

    });
}


export {preFetchTabsData, preFetchSpecificTabData}
