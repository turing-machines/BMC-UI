//const API_ROOT = 'https://ronaldo.svenrademakers.com:8080/'; // Testing
const API_ROOT = '/'; // Production
window.API_ROOT = API_ROOT;

import 'parsleyjs/dist/parsley.min.js';


import {showNotifications, showToastNotification} from "./functions/notifications.js";
import {preFetchTabsData} from "./functions/preFetchData.js";

window.$ = window.jQuery = jQuery;
("use strict");


jQuery(() => {

    // Show Notification on page loading
    showNotifications();

    import('./components/tabs.js')

    import('./components/form-elements.js')

    import('./functions/reboot.js')


    // Tabs
    import('./tabs/tab-usb.js')

    import('./tabs/tab-nodes.js')

    import('./tabs/tab-info.js')

    import('./tabs/tab-firmware-upgrade.js')

    import('./tabs/tab-flash-node.js')


    // Prefetch All Data from Server
    preFetchTabsData();


});

function ajaxFailToast(xhr, textStatus, errorThrown) {
    setTimeout(() => {
        let msg = xhr.responseText;

        if (xhr.responseText === undefined) {
            msg = errorThrown;
        }

        let error = textStatus;
        if (msg.length !== 0) {
            error += ' : ' + msg;
        }

        showToastNotification(error, 'error');
    }, 300);
}

export {ajaxFailToast}
