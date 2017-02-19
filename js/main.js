$(document).ready(function() {

    initHeader();

    initNav();
});

function initHeader() {
    $(window).scroll(function() {

        if ($(window).scrollTop() > 200) {
            $('.header').addClass('js-header-on-scroll');
            $('.mobile-nav').css({
                top: $('.header').outerHeight()
            });
            $('.mobile-nav__list').css({
                marginTop: -$('.header').outerHeight()
            });
        } else if ($(window).scrollTop() <= 200) {
            $('.header').removeClass('js-header-on-scroll');
            $('.mobile-nav').css({
                top: 0
            });
            $('.mobile-nav__list').css({
                marginTop: 0
            });
        }

    });
}

function initNav() {

    if ($(window).width() >= 900) {
        $('.mobile-nav__toggle').hide();
    } else {
        $('.desktop-nav').hide();
    }

    $(window).resize(function() {
        if ($(window).width() >= 900 && $('.desktop-nav').is(':hidden')) {
            $('.mobile-nav__toggle').toggle();
            $('.desktop-nav').toggle();

            if ($('.mobile-nav').is(':visible')) {
                $('.mobile-nav').slideUp();
            }
        } else if ($(window).width() < 900 && $('.mobile-nav__toggle').is(':hidden')) {
            $('.mobile-nav__toggle').toggle();
            $('.desktop-nav').toggle();
        }
    });

    $('.mobile-nav__toggle').click(function() {
        $('.mobile-nav').slideToggle('slow');
    });

    $('.mobile-nav').click(function() {
        $(this).slideToggle('slow');
    });
}