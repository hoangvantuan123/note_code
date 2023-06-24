
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

pageSize = 5;

showPage = function(page) {
    $(".container-banner").hide();
    $(".container-banner").each(function(n) {
        if (n >= pageSize * (page - 1) && n < pageSize * page)
            $(this).show();
    });        
}

showPage(1);

$("#pagin li a").click(function() {
    $("#pagin li a").removeClass("current");
    $(this).addClass("current");
    showPage(parseInt($(this).text())) 
});