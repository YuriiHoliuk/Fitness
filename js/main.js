$(document).ready(function() {

    $(window).scroll(function() {

        if ($(window).scrollTop() > 300) {
            $('.header').addClass('js-header-on-scroll');
        } else if ($(window).scrollTop() <= 300) {
            $('.header').removeClass('js-header-on-scroll');
        }
    });

    initNav();
});

function initNav() {
    if ($(window).width() >= 900) {
        $('.mobile-nav__show').addClass('js-hide');
    } else {
        $('.desktop-nav').addClass('js-hide');
    }
    $(window).resize(function() {
        if ($(window).width() >= 900 && $('.desktop-nav').hasClass('js-hide')) {
            $('.mobile-nav__show').toggleClass('js-hide');
            $('.desktop-nav').toggleClass('js-hide');
        } else if ($(window).width() < 900 && $('.mobile-nav__show').hasClass('js-hide')) {
            $('.mobile-nav__show').toggleClass('js-hide');
            $('.desktop-nav').toggleClass('js-hide');
        }
    });
    $('.mobile-nav__show').click(function() {
        $('.mobile-nav').slideToggle();
    });
}