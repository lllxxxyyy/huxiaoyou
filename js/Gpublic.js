// 获取域名
      var domainName=''//初始化域名
      if(window.location.protocol+"//"+window.location.host=="http://region.aibebi.net"){
          domainName='http://www.aibebi.net'
      }else{
          // domainName='http://ceshi.aibebi.net'
          domainName='http://www.aibebi.net'
      }
function animationChange(alertValue) {
  $(".alertDIv").css('display', 'block')
  $(".alertDIv").text(alertValue)
  $('.alertDIv').addClass('animated bounce slow bounceOutDown')
 
  setTimeout(function() {
    $(".alertDIv").css('display', 'none')
    $('.alertDIv').removeClass('bounceOutDown')
  }, 1000)
}
var token=localStorage.getItem("token")
$.ajaxSettings.beforeSend = function(xhr,request){ 
	console.log(xhr)
	xhr.setRequestHeader('Authorization', token)
}
