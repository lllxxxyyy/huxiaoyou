// 获取域名
      var domainName=''//初始化域名
      if(window.location.protocol+"//"+window.location.host=="http://region.aibebi.net"){
          domainName='http://www.aibebi.net'
      }else{
          domainName='http://ceshi.aibebi.net'
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
                  console.log(res)
                 }

              })
		// window.location.href="renzheng.html"
	})