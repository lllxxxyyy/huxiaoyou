function animationChange(alertValue) {
  $(".alertDIv").css('display', 'block')
  $(".alertDIv").text(alertValue)
  $('.alertDIv').addClass('animated bounce slow bounceOutDown')
 
  setTimeout(function() {
    $(".alertDIv").css('display', 'none')
    $('.alertDIv').removeClass('bounceOutDown')
  }, 1000)
}
