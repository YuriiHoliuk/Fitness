$(document).ready(function() {

    $(window).scroll(function() {

        if ($('.mobile-nav').is(':hidden')) {
            if ($(window).scrollTop() > 200) {
                $('.header').addClass('js-header-on-scroll');
            } else if ($(window).scrollTop() <= 200) {
                $('.header').removeClass('js-header-on-scroll');
            }
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

    function toggleHeaderBg() {
        if ($(window).scrollTop() > 200) { //виправити іншим способом
            $('.header').toggleClass('js-header-on-scroll');
        }
    }

    $(window).resize(function() {
        if ($(window).width() >= 900 && $('.desktop-nav').hasClass('js-hide')) {
            $('.mobile-nav__show').toggleClass('js-hide');
            $('.desktop-nav').toggleClass('js-hide');

            if ($('.mobile-nav').is(':visible')) {
                $('.mobile-nav').slideToggle();
            }
        } else if ($(window).width() < 900 && $('.mobile-nav__show').hasClass('js-hide')) {
            $('.mobile-nav__show').toggleClass('js-hide');
            $('.desktop-nav').toggleClass('js-hide');
        }
    });

    $('.mobile-nav__show').click(function() {
        $('.mobile-nav').slideToggle('slow', toggleHeaderBg);
    });

    $('.mobile-nav').click(function() {
        $(this).slideToggle('slow', toggleHeaderBg);
    });
}