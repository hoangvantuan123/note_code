
$(document).ready(function(){
    $('#toggle').click(function(){
        $('nav').slideToggle();
    });
})


$(document).ready(function(){
    $('#dots').click(function(){
        $('.menu-top1').slideToggle();
    });
})



  $('.wrapper-content').slick({
    dots: true,
    infinite: false,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
    slidesToScroll: 2,
    prevArrow: '<button><i class="fa-solid fa-chevron-left"></i></button>',
    nextArrow: '<button><i class="fa-solid fa-chevron-right"></i></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
      // You can unslick at a given breakpoint now by adding:
      // settings: "unslick"
      // instead of a settings object
    ]
  });