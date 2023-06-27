
$(document).ready(function(){
    $('.carousel').slick({
        centerMode: true,
        dots: true,
        infinite: true,
        speed: 300,
        autoplay: true,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        fade: true,
        arrows: true,
        prevArrow: '<span class="priv-arrow"><i class="fas fa-chevron-left"></i></span>',
        nextArrow: '<span class="next-arrow"><i class="fas fa-chevron-right"></i></span>',
        cssEase: 'linear'
    });
    $('.recom-wraper').slick({
        centerMode: true,
        autoplay: true,
        arrows: false,
        autoplaySpeed: 2000,
        centerPadding: '120px',
        slidesToShow: 3,
        responsive: [
        {  breakpoint: 1366, settings: { centerPadding: '80px', slidesToShow: 2 } },
        {  breakpoint: 789, settings: { centerPadding: '175px', slidesToShow: 1 } },
        {  breakpoint: 750, settings: { centerPadding: '150px', slidesToShow: 1}  },
        {  breakpoint: 700, settings: { centerPadding: '130px', slidesToShow: 1}  },
        {  breakpoint: 650, settings: { centerPadding: '90px', slidesToShow: 1}  },
        {  breakpoint: 600, settings: { centerPadding: '80px', slidesToShow: 1}  },
        {  breakpoint: 550, settings: { centerPadding: '60px', slidesToShow: 1}  },
        {  breakpoint: 500, settings: { centerPadding: '20px', slidesToShow: 1}  },
        {  breakpoint: 450, settings: { centerPadding: '2px', slidesToShow: 1}  },
        {  breakpoint: 400, settings: { centerPadding: '10px', slidesToShow: 1}  },
        {  breakpoint: 320, settings: { centerPadding: '3px', slidesToShow: 1}  },
        ]
    });
});
$(window).on("scroll", function() {
    if($(window).scrollTop() > 250) {
        $(".nav-bar").addClass("nav-bar-color");
    } else {
       $(".nav-bar").removeClass("nav-bar-color");
    }
});
$("#catalog-flters li").click(function () {
    $("#catalog-flters li").removeClass('filter-active');
    $(this).addClass('filter-active');

    var selectedFilter = $(this).data("filter");
    $("#catalog-wrapper").fadeTo(100, 0);

    $(".catalog-item").fadeOut();

    setTimeout(function () {
      $(selectedFilter).fadeIn(100);
      $("#catalog-wrapper").fadeTo(300, 1);
    }, 300);
});
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const profile = document.querySelector('.profile');
    const nav = document.querySelector('.navigation');
    const navLinks = document.querySelectorAll('.navigation li');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav-active');
        profile.classList.toggle('profile-active');
        navLinks.forEach((link, index) => {
            if(link.style.animation) {
                linl.style.animation = '';
            } else {
                link.style.animation = 'navLinkFade 0.5s ease forwards $(index / 7 + 0.5s}s'
            }
        });
        
        burger.classList.toggle('toggle');
    });
};
navSlide();