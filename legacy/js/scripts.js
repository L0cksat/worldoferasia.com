    document.addEventListener('DOMContentLoaded', function(){
    const burger = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burger && navLinks){
        burger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            burger.classList.toggle('icon-open');

            const isExapanded = burger.getAttribute('aria-expanded') === 'true' || false
            burger.setAttribute('aria-expanded', !isExapanded);
        });
    }
    });