function animationChange(alertValue) {
  $(".alertDIv").css('display', 'block')
  $(".alertDIv").text(alertValue)
  $('.alertDIv').addClass('animated bounce slow bounceOutDown')
 
  setTimeout(function() {
    $(".alertDIv").css('display', 'none')
    $('.alertDIv').removeClass('bounceOutDown')
  }, 1000)
}
// var token=localStorage.getItem("token")
// $.ajaxSettings.beforeSend = function(xhr,request){ 
// 	// xhr.setRequestHeader('Authorization', token)   
// 		// console.log( xhr ) 
// }
