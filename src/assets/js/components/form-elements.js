import 'selectric/src/jquery.selectric.js'


// Function is selecting option by label ( not by value )
function setSelectOptionByLabel($select, label) {
    $select.find('option').each(function () {
        if ($(this).text().trim() === label.trim()) {

            const val = $(this).val();

            // Trigger the selection of the matching option
            $select.val(val).selectric('refresh')
            return false; // Stop the loop once the option is found
        }
    });
}


// Select
{
    const selects = $('select')
    selects.each(function () {
        const select = $(this);
        const selectricSelect = select.selectric({
            maxHeight: 375,
            disableOnMobile: false,
            nativeOnMobile: false
        });

        // Prevent Open on Focus
        select.on('focus', function (e) {
            select.selectric('close');
        })

        selectricSelect.on('selectric-open', function (event, element, selectric) {
            $(element).parents('.select-item').addClass('open')
        });

        selectricSelect.on('selectric-close', function (event, element, selectric) {
            $(element).parents('.select-item').removeClass('open')
        });

    })
}

// Input
{
    function initInputs() {
        // Regular Input
        $('body').find('.input-wrap').each(function () {
            const input = $(this).find('input');
            const wrap = $(this);

            if (input.length && !wrap.hasClass('inited')) {

                if (input.val().length > 0) {
                    wrap.addClass('active')
                } else {
                    wrap.removeClass('active')
                }

                input.on('focus', function () {
                    wrap.addClass('focus')
                })

                input.on('blur', function () {
                    wrap.removeClass('focus')
                    if (input.val().length > 0) {
                        wrap.addClass('active')
                    } else {
                        wrap.removeClass('active')
                    }
                })

                wrap.addClass('inited')

                const desc = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
                Object.defineProperty(input[0], "value", {
                    get: desc.get,
                    set: function (v) {

                        if (v.length > 0) {
                            wrap.addClass('active')
                        } else {
                            wrap.removeClass('active')
                        }

                        desc.set.call(this, v);
                    }
                });

            }
        })
    }

    initInputs();

    $(document).on('reinit-inputs',function (){
        initInputs();
    })

}

// Input Type File
{
    // Add Custom jquery method for input type file
    {
        //Reference:
        //https://www.onextrapixel.com/2012/12/10/how-to-create-a-custom-file-input-with-jquery-css3-and-php/
        ;(function ($) {

        // Browser supports HTML5 multiple file?
        var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined', isIE = /msie/i.test(navigator.userAgent);

        $.fn.customFile = function () {

            return this.each(function () {

                var $file   = $(this).addClass('custom-file-upload-hidden'), // the original file input
                    $wrap   = $('<div class="file-upload-wrapper">'),
                    $input  = $(this).siblings('.file-upload-input'),
                    // Button that will be used in non-IE browsers
                    $button = $('<button type="button" class="file-upload-button"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 99.09 122.88">\n' +
                        '    <path d="M64.64,13,86.77,36.21H64.64V13ZM42.58,71.67a3.25,3.25,0,0,1-4.92-4.25l9.42-10.91a3.26,3.26,0,0,1,4.59-.33,5.14,5.14,0,0,1,.4.41l9.3,10.28a3.24,3.24,0,0,1-4.81,4.35L52.8,67.07V82.52a3.26,3.26,0,1,1-6.52,0V67.38l-3.7,4.29ZM24.22,85.42a3.26,3.26,0,1,1,6.52,0v7.46H68.36V85.42a3.26,3.26,0,1,1,6.51,0V96.14a3.26,3.26,0,0,1-3.26,3.26H27.48a3.26,3.26,0,0,1-3.26-3.26V85.42ZM99.08,39.19c.15-.57-1.18-2.07-2.68-3.56L63.8,1.36A3.63,3.63,0,0,0,61,0H6.62A6.62,6.62,0,0,0,0,6.62V116.26a6.62,6.62,0,0,0,6.62,6.62H92.46a6.62,6.62,0,0,0,6.62-6.62V39.19Zm-7.4,4.42v71.87H7.4V7.37H57.25V39.9A3.71,3.71,0,0,0,61,43.61Z"/>\n' +
                        '</svg></button>'), // Hack for IE
                    $label  = $('<label class="file-upload-button" for="' + $file[0].id + '">Select a File</label>');

                // Hide by shifting to the left so we
                // can still trigger events
                $file.css({
                    position: 'absolute',
                    left: '-9999px'
                });

                $wrap.insertAfter($file)
                    .append($file, $input, (isIE ? $label : $button));

                // Prevent focus
                $file.attr('tabIndex', -1);
                $button.attr('tabIndex', -1);

                $button.click(function () {
                    $file.focus().click(); // Open dialog
                });

                $file.change(function () {
                    var files = [], fileArr, filename;

                    // If multiple is supported then extract
                    // all filenames from the file array
                    if (multipleSupport) {
                        fileArr = $file[0].files;
                        for (var i = 0, len = fileArr.length; i < len; i++) {
                            files.push(fileArr[i].name);
                        }
                        filename = files.join(', ');

                        // If not supported then just take the value
                        // and remove the path to just show the filename
                    } else {
                        filename = $file.val().split('\\').pop();
                    }

                    $input.val(filename) // Set the value
                        .attr('title', filename) // Show filename in title tootlip
                        .focus(); // Regain focus

                });

                $(".file-upload-input").on('keydown', function () {
                    $file.val('');
                });

                $input.on({
                    blur: function () {
                        $file.trigger('blur');
                    },
                    //                   keydown: function (e) {
                    //                       if (e.which === 13) { // Enter
                    //                           if (!isIE) {
                    //                               $file.trigger('click');
                    //                           }
                    //                       } else if (e.which === 8 || e.which === 46) { // Backspace & Del
                    //                           // On some browsers the value is read-only
                    //                           // with this trick we remove the old input and add
                    //                           // a clean clone with all the original events attached
                    //                           $file.replaceWith($file = $file.clone(true));
                    //                           $file.trigger('change');
                    //                           $input.val('');
                    //                       } else if (e.which === 9) { // TAB
                    //                           return;
                    //                       } else { // All other keys
                    //                           return false;
                    //                       }
                    //                   }
                });

            });

        };

        // Old browser fallback
        if (!multipleSupport) {
            $(document).on('change', 'input.customfile', function () {

                var $this                                                  = $(this), // Create a unique ID so we
                    // can attach the label to the input
                    uniqId = 'customfile_' + (new Date()).getTime(), $wrap = $this.parent(),

                    // Filter empty input
                    $inputs                                                = $wrap.siblings().find('.file-upload-input')
                        .filter(function () {
                            return !this.value
                        }),

                    $file                                                  = $('<input type="file" id="' + uniqId + '" name="' + $this.attr('name') + '"/>');

                // 1ms timeout so it runs after all other events
                // that modify the value have triggered
                setTimeout(function () {
                    // Add a new input
                    if ($this.val()) {
                        // Check for empty fields to prevent
                        // creating new inputs when changing files
                        if (!$inputs.length) {
                            $wrap.after($file);
                            $file.customFile();
                        }
                        // Remove and reorganize inputs
                    } else {
                        $inputs.parent().remove();
                        // Move the input so it's always last on the list
                        $wrap.appendTo($wrap.parent());
                        $wrap.find('input').focus();
                    }
                }, 1);

            });
        }

    }(jQuery));
    }

    $('input[type=file]').customFile();

}


export {setSelectOptionByLabel}
