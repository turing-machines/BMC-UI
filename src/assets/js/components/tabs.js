function setActiveTab(index) {
    $('.tabs-header__list-item').each(function () {
        const tabBody = $(this)
        const tabIndex = tabBody.attr('data-tab')
        if (tabIndex === index) {
            tabBody.addClass('active')
        } else {
            tabBody.removeClass('active')
        }
    })
    $('.tabs-body__item').each(function () {
        const tabBody = $(this)
        const tabIndex = tabBody.attr('data-tab')
        if (tabIndex === index) {

            tabBody.addClass('active')
            localStorage.setItem('current-tab', index)

        } else {
            tabBody.removeClass('active')
        }
    })
}


// Get Current Tab rom LocalStorage
if (localStorage.getItem('current-tab')) {
    setActiveTab(localStorage.getItem('current-tab'))
} else {
    setActiveTab('Info')
}


// Tabs Click Handler
$('.tabs-header__list-item').on('click', function (e) {
    e.preventDefault();
    const listItem = $(this)
    const tabIndex = listItem.attr('data-tab')
    setActiveTab(tabIndex)
})
