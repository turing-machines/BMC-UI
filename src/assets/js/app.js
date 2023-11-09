import 'parsleyjs/dist/parsley.min.js';

import {showNotifications} from "./functions/notifications.js";
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

    import('./tabs/tab-power.js')

    import('./tabs/tab-info.js')

    import('./tabs/tab-firmware-upgrade.js')

    import('./tabs/tab-flash-node.js')


    // Prefetch All Data from Server
    preFetchTabsData();



});
