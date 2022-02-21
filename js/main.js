window.addEventListener('DOMContentLoaded', event => {

    // NAVBAR
    let navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbarShrink')
        } else {
            navbarCollapsible.classList.add('navbarShrink')
        };

    };

    navbarShrink();

    document.addEventListener('scroll', navbarShrink);



    const navbarToggler = document.body.querySelector('.navbarToggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .navLink')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            };
        });
    });

    // GALERY
    new SimpleLightbox({
        elements: '#portfolio a.portfolio-box'
    });
});