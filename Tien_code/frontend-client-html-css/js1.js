

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

 $('.right').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.left'
  });
  $('.left').slick({
    slidesToShow: 5,
    slidesToScroll: 1,
    asNavFor: '.right',
    dots: false,
    autoplay: true,
    centerMode: true,
    focusOnSelect: true
  });


  $('input.input-qty').each(function() {
    var $this = $(this),
      qty = $this.parent().find('.is-form'),
      min = Number($this.attr('min')),
      max = Number($this.attr('max'))
    if (min == 0) {
      var d = 0
    } else d = min
    $(qty).on('click', function() {
      if ($(this).hasClass('minus')) {
        if (d > min) d += -1
      } else if ($(this).hasClass('plus')) {
        var x = Number($this.val()) + 1
        if (x <= max) d += 1
      }
      $this.attr('value', d).val(d)
    })
  })


  // <img data-lazy="img/lazyfonz1.png"/>

$('.wrapper').slick({
  lazyLoad: 'ondemand',
  slidesToShow: 4,
  slidesToScroll: 1,
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
        slidesToShow: 2,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
});



