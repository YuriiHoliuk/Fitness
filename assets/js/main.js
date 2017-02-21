$(function() {

    initHeader();

    initNav();
});

function initHeader() {
    $(window).scroll(function() {

        if ($(window).scrollTop() > 200) {
            $('.header').addClass('js-header-on-scroll');
            $('.mobile-nav').css({
                top: $('.header').outerHeight(),
                paddingTop: 100 - $('.header').outerHeight()
            });
        } else if ($(window).scrollTop() <= 200) {
            $('.header').removeClass('js-header-on-scroll');
            $('.mobile-nav').css({
                top: 0,
                paddingTop: 100
            });
        }

    });
}

function initNav() {

    if ($(window).width() >= 900) {
        $('.mobile-nav__toggle').hide();
        $('.nav').addClass('desktop-nav');
    } else {
        $('.nav').addClass('mobile-nav');
    }

    $(window).resize(function() {
        if ($(window).width() >= 900 && $('.nav').hasClass('mobile-nav')) {

            $('.mobile-nav__toggle').toggle();
            $('.nav').toggleClass('mobile-nav desktop-nav').show();

        } else if ($(window).width() < 900 && $('.mobile-nav__toggle').is(':hidden')) {
            $('.mobile-nav__toggle').toggle();
            $('.nav').toggleClass('desktop-nav mobile-nav').hide();
        }
    });

    $('.mobile-nav__toggle').click(function() {
        $('.mobile-nav').slideToggle('slow');
    });

    $('.mobile-nav').click(function() {
        $(this).slideToggle('slow');
    });
}