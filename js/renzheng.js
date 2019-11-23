// 获取域名
      var domainName=''//初始化域名
      if(window.location.protocol+"//"+window.location.host=="http://region.aibebi.net"){
          domainName='http://www.aibebi.net'
      }else{
          // domainName='http://ceshi.aibebi.net'
          domainName='http://www.aibebi.net'
      }

 	$(".Certi_wrapper").on("tap",'.renSumbit',function(){
		var userName=$("input[name='userName']").val()
		var IDCard=$("input[name='IDCard']").val()
		var PhoneNum=$("input[name='PhoneNum']").val()
		var BankCard=$("input[name='BankCard']").val()
	 	var personInfo= $.param({'mobile':PhoneNum,'real_name':userName,'id_card':IDCard,'bank_card':BankCard,'type':3})
              $.ajax({
                url:domainName+'/user/real_Name',
               	type:'post',
                async:false,
                datatype:'jsonp',
                data: personInfo,
                jsonp:"callback",
                success:function(res){
                  
                      localStorage.setItem('aa',JSON.stringify({"mobile":PhoneNum,'real_name':userName,'id_card':IDCard,'bank_card':BankCard,'type':3}))
                      window.location.href="SMS.html"
                  if(res.code==200){
                      // localStorage.setItem('aa',JSON.parse({"mobile": PhoneNum,'real_name':userName,'id_card':IDCard,'bank_card':BankCard,'type':3}))
                  		window.location.href="SMS.html"
                  }else{
                    animationChange(res.msg)
                  }
                 }
              })
		// window.location.href="renzheng.html"
	})
  $("input[name='IDCard']").on("change",function(){
            var IDCard=$("input[name='IDCard']").val()
            var idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
             iFlag = idCardReg.test(IDCard);
            if(!iFlag){
                alert('您输入的身份证格式有误！')
            }
  })


  // 获取光标位置
function getCursortPosition(textDom) {
    var cursorPos = 0;
    console.log(textDom.setSelectionRange)
    if (document.selection) {
        // IE Support
        textDom.focus();
        var selectRange = document.selection.createRange();
        selectRange.moveStart('character', -textDom.value.length);
        cursorPos = selectRange.text.length;
    } else if (textDom.setSelectionRange) {
        // webkit support
        textDom.focus();
        cursorPos = textDom.selectionStart;
    }
    return cursorPos;
}
// 设置光标位置
function setCaretPosition(textDom, pos) {
    if (textDom.setSelectionRange) {
        textDom.focus();
        textDom.setSelectionRange(pos, pos);
    } else if (textDom.createTextRange) {
        // IE Support
        var range = textDom.createTextRange();
        range.collapse(true);
        range.moveEnd('character', pos);
        range.moveStart('character', pos);
        range.select();
    }
}
/**
 * 账号输入时自动4位一空格
 */
$(function () {
    var isDelete = false;
    $("input[name='BankCard']").on("keyup", function (e) {
      // alert(1)
        var elem = this;
        //加timeout是为了处理安卓部分机型系统键盘无法录入的问题如vivo
        setTimeout(function(){
            var str = elem.value;
            console.log(str)
            var currentPos = getCursortPosition(elem);
            var posAfterText = "";
            var posPreText = "";
            var isNextBlank = false;//后面的是否是空格
            var isPreBlank = false;
            var isLastPos = true;
            if (currentPos != str.length) {//不是最后一个
              // alert(2)
                posAfterText = str.substr(currentPos, 1);
                posPreText = str.substr(currentPos - 1, 1);
                isNextBlank = /^\s+$/.test(posAfterText);
                isPreBlank = /^\s+$/.test(posPreText);
                isLastPos = false;
            }
            if(elem.value.length <= $(elem).attr("maxlength")){//最大长度控制
                // alert(3)
                elem.value = elem.value.replace(/\s/g, '').replace(/(\w{4})(?=\w)/g, "$1 ");
            }
            if (isDelete) {
                // alert(4)
                if (isPreBlank) {
                    setCaretPosition(elem, currentPos - 1);
                } else {
                    setCaretPosition(elem, currentPos);
                }
            } else {
                // alert(5)
                if (!isLastPos) {
                    if (isNextBlank) {
                        setCaretPosition(elem, currentPos + 1);
                    } else {
                        setCaretPosition(elem, currentPos);
                    }
                } else {
                    setCaretPosition(elem, elem.value.length);
                }
            }
        },0);
    });
    $("input[name='BankCard']").on("keydown", function (e) {
        //console.log("keyCode=" + window.event.keyCode);
        isDelete = window.event.keyCode == 8;//标记用户进行删除操作
    });

})

