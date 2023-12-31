import Toastify from 'toastify-js'

function SetSessionNotification(json) {
    var Result;
    if (json === "urlerr") {
        sessionStorage.setItem('Notification', 'err');
    } else {
        $.each(json, function (index, item) {
            Result = json[index][0].result;
        });

        if (Result === "ok") {
            sessionStorage.setItem('Notification', 'ok');
        } else {
            sessionStorage.setItem('Notification', 'err');
        }
    }

    showNotifications();
}

function showNotifications() {
    if (sessionStorage.getItem('Notification') === "ok") {

        showToastNotification('Success', 'success')

    } else if (sessionStorage.getItem('Notification') === "err") {

        showToastNotification('Error', 'error')

    }

    sessionStorage.removeItem('Notification');
}

function showToastNotification(text, status = 'success') {
    if (status == 'success') {


        Toastify({
            text: `
            <span class="icon">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M4.11101 2.17971C5.26215 1.41054 6.61553 1 8 1C8.91925 1 9.82951 1.18106 10.6788 1.53284C11.5281 1.88463 12.2997 2.40024 12.9497 3.05025C13.5998 3.70026 14.1154 4.47194 14.4672 5.32121C14.8189 6.17049 15 7.08075 15 8C15 9.38447 14.5895 10.7378 13.8203 11.889C13.0511 13.0401 11.9579 13.9373 10.6788 14.4672C9.3997 14.997 7.99224 15.1356 6.63437 14.8655C5.2765 14.5954 4.02922 13.9287 3.05026 12.9497C2.07129 11.9708 1.4046 10.7235 1.13451 9.36563C0.86441 8.00776 1.00303 6.6003 1.53285 5.32121C2.06266 4.04213 2.95987 2.94888 4.11101 2.17971ZM4.88881 12.6562C5.80972 13.2716 6.89243 13.6 8 13.6C9.48521 13.6 10.9096 13.01 11.9598 11.9598C13.01 10.9096 13.6 9.48521 13.6 8C13.6 6.89242 13.2716 5.80972 12.6562 4.88881C12.0409 3.96789 11.1663 3.25012 10.143 2.82627C9.11976 2.40242 7.99379 2.29153 6.9075 2.5076C5.8212 2.72368 4.82338 3.25703 4.0402 4.0402C3.25703 4.82337 2.72368 5.8212 2.50761 6.90749C2.29153 7.99379 2.40243 9.11976 2.82628 10.143C3.25013 11.1663 3.96789 12.0409 4.88881 12.6562ZM5.16665 7.84659C4.94445 8.06687 4.94445 8.42393 5.16665 8.64428L5.16635 8.64417L6.87115 10.3347C7.09329 10.5551 7.45336 10.5551 7.67556 10.3347C7.69975 10.3107 7.72155 10.285 7.74049 10.2579L10.8748 6.41507C11.0712 6.17296 11.0323 5.81888 10.7881 5.62415C10.5438 5.42942 10.1867 5.468 9.99036 5.71011L7.22975 9.09494L5.97088 7.84659C5.74892 7.62624 5.38885 7.62624 5.16665 7.84659Z" fill="#009906"/>
</svg>

            </span>
            <div class="caption">
                ${text}
            </div>
            `,
            duration: 1500,
            close: false,
            className: 'success',
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            escapeMarkup: false
        }).showToast();


    } else {


        Toastify({
            text: `
            <span class="icon">
                 <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M3.11101 1.17971C4.26215 0.410543 5.61553 0 7 0C7.91925 0 8.82951 0.18106 9.67879 0.532843C10.5281 0.884626 11.2997 1.40024 11.9497 2.05025C12.5998 2.70026 13.1154 3.47194 13.4672 4.32121C13.8189 5.17049 14 6.08075 14 7C14 8.38447 13.5895 9.73784 12.8203 10.889C12.0511 12.0401 10.9579 12.9373 9.67879 13.4672C8.3997 13.997 6.99224 14.1356 5.63437 13.8655C4.2765 13.5954 3.02922 12.9287 2.05026 11.9497C1.07129 10.9708 0.404603 9.7235 0.134506 8.36563C-0.13559 7.00776 0.00303299 5.6003 0.532846 4.32121C1.06266 3.04213 1.95987 1.94888 3.11101 1.17971ZM3.88881 11.6562C4.80972 12.2716 5.89243 12.6 7 12.6C8.48521 12.6 9.9096 12.01 10.9598 10.9598C12.01 9.90959 12.6 8.48521 12.6 7C12.6 5.89242 12.2716 4.80972 11.6562 3.88881C11.0409 2.96789 10.1663 2.25012 9.14303 1.82627C8.11976 1.40242 6.99379 1.29153 5.9075 1.5076C4.8212 1.72368 3.82338 2.25703 3.0402 3.0402C2.25703 3.82337 1.72368 4.8212 1.50761 5.90749C1.29153 6.99379 1.40243 8.11976 1.82628 9.14302C2.25013 10.1663 2.96789 11.0409 3.88881 11.6562ZM5.22495 4.4173L7 6.19223L8.77505 4.4173C8.99812 4.19424 9.35964 4.19423 9.58271 4.4173C9.80577 4.64037 9.80577 5.00189 9.58271 5.22496L7.80765 6.99989L9.58271 8.77503C9.80577 8.9981 9.80577 9.35962 9.58271 9.58269C9.47133 9.69387 9.32475 9.74997 9.17888 9.74997C9.0332 9.74997 8.88663 9.69427 8.77505 9.58269L7 7.80756L5.22495 9.58269C5.00189 9.80576 4.64036 9.80576 4.41729 9.58269C4.19424 9.35962 4.19424 8.9981 4.41729 8.77503L6.19235 6.99989L4.4173 5.22497C4.19425 5.0019 4.19424 4.64037 4.41729 4.4173C4.64036 4.19423 5.00188 4.19424 5.22495 4.4173Z" fill="#D95335"/>
</svg>

            </span>
            <div class="caption">
                ${text}
            </div>
            `,
            duration: 3000,
            close: false,
            className: 'error',
            gravity: "top", // `top` or `bottom`
            position: "center", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            escapeMarkup: false
        }).showToast();

    }
}


export {showNotifications, showToastNotification, SetSessionNotification}


