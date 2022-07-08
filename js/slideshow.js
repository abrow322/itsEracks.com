//Bx Slider Plugin for Slideshow https://bxslider.com/
$(document).ready(function() {
    var slider = $("#slider").bxSlider({
        auto: false,
        moveSlides: 1,
        speed: 750,
        pager: true,
        captions: true,
        slideWidth: 1000,
        slideMargin: 10,
        infiniteLoop: false
    });

});