

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

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
/* Hiển thị giá trị mặc định 50 cho thẻ span với id là demo*/
output.innerHTML = slider.value; 
/* cập nhật giá trị hiện tại của ranger slider*/
slider.oninput = function() {
  output.innerHTML = this.value;
}

