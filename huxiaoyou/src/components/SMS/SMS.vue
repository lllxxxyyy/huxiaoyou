<!-- 短信验证 -->
<template>
  <div class="SMS">
        <div class="Certi_header">
           <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
			<span>短信验证</span>
            <span></span>
		</div>
		<ul class="Certi_center">
			<li><span>手机号码：</span><span class="phone">{{realInfo.mobile}}</span></li>
			<li>
				<span>短信验证码：</span>
				<input oninput = "value=value.replace(/[^\d]/g,'')"  name="SMSNum" type="text" v-model="codeNum" maxlength="4"  placeholder="请填写短信验证码">
				<button @click="verGetCode" :disabled="isDisabled" :class="['payPassPhoneCode',isDisabled?'payPassPhoneCodeChange':'']">{{getCode}}</button>

			</li>
		</ul>
		<div class="renSumbit" @click="tijiao">提交</div>
         <!-- 提示盒子 -->
        <transition name="fade">
        <div class="promptFather" v-if="showPrompt">
            <div class="prompt">
            {{promptContent}}
            </div>
        </div>
        </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
  data () {
    return {
        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
        timer2:'',
        
        getCode:'获取验证码',//获取验证码
        i:60,//秒数
        timer:'', //获取验证码定时器
        isDisabled:false, // 按钮置灰（发送验证码后按钮置灰）

        codeNum:'',
    };
  },

  components: {},

 computed:{
        ...mapState(['staticImgH','tokenH','billMoney','isPerson','realInfo'])
    },

  mounted: {},

  methods: {
    //   提交
    tijiao(){
          var type=""
        if(this.isPerson==1){
            type=2  //选手
        }else if(this.isPerson==0){
            type=1  //用户
        }
        var obj=qs.stringify({
            mobile:this.realInfo.mobile,
            real_name:this.realInfo.real_name,
            id_card:this.realInfo.id_card,
            bank_card:this.realInfo.bank_card,
            code:this.codeNum,
            type:type
        })
        this.$http.post('api/user/bang_Name',obj).then((res)=>{
            if(res.data.code==200){
                this.$router.push('/withdraw')
            }else{
                this.alertText(res.data.msg)
            }
        })
    },
      //   弹框提示
            alertText(text){
                var self=this
                clearInterval(self.timer2);
                        this.promptContent=text
                        this.showPrompt=true
                        self.timer2=setTimeout(function(){
                            self.showPrompt=false
                            clearInterval(self.timer2);
                        },2000)
                    return false;
            },
      toReturn(){
          this.$router.push("/shiming")
      },
      verGetCode(){
            var obj=qs.stringify({
                  mobile:this.realInfo.mobile,
                  scene:23,
              })
           this.$http.post('api/user/ver_tion',obj).then((res)=>{
              var data=res.data
              var self=this
              if(data.code==200){
                    //发送成功得提示语 
                    this.alertText(data.msg)
                     
                    //  发送成功后秒数提示
                    clearInterval(self.timer)
                    self.timer=setInterval(function(){
                        self.isDisabled=true;
                        self.getCode=self.i +"S";
                        self.i--;
                        if(self.i<0){
                            self.i=60;
                            self.getCode="获取验证码";
                            self.isDisabled=false;
                            clearInterval(self.timer);
                        }
                    },1000)
                }else{
                    //发送失败 提示语
                    this.alertText(data.msg)
                }
          })
      },
    //   verGetCode(){
    //       var obj=qs.stringify({
    //           mobile:,
    //           scene:1
    //       })
    //       this.$http.post('api/user/ver_tion',obj).then((res)=>{
    //           console.log(res)
    //       })
    //   },
      ...mapMutations(['']),
  }
}

</script>
<style scoped lang="stylus">
.SMS{
    width:100%;
    height:100%;
    background :#fff;
}
 .Certi_header{
    width:100%
    height:1.23rem;
    display :flex;
    align-items :center;
    justify-content :space-between;
    position :relative;
    padding:0 0.4rem;
    >img{
        width:0.32rem;
        height:0.56rem;
    }
    >span{
        font-size:0.48rem;
        color:rgba(0, 0, 0, 1);
        padding-left:1.32rem;
    }
 }
.Certi_header>span{
	font-size:0.64rem;
	margin-left:0.72rem;
	font-weight:600;
	
}
.Certi_headerImg>img{
	width:4.24rem;
	height:4.12rem;
	position: absolute;
	top:0;
	right:0;

}
.Certi_center{
	padding:0 0.72rem;
}
.Certi_center>li{
		height:1.387rem;
		display:flex;
		align-items: center;
		border-bottom:0.03rem  solid rgba(0, 0, 0, 0.14);
		
}
.Certi_center>li>span{
			font-size:0.427rem;
			font-weight:600;
	}
.Certi_center>li>input{
			width: 4rem;
			font-size:0.453rem;
			outline:none;
			border:0;
	}
.Certi_center>li>input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    font-size: 0.427rem;
}
.renSumbit{
	width:8.67rem;
	height:1.07rem;
	text-align: center;
	line-height: 1.07rem;
	font-size:0.437rem;
	margin:0 auto;
	margin-top:2rem;
	background: rgba(255, 157, 172, 1);
	border-radius: 0.67rem;
	color:rgba(255, 255, 255, 1);
}


button{
    background :#fff;
    border:0;
    outline :none;
    font-size:0.32rem;
    color:#FF3924;
    letter-spacing :0.04rem;
    padding:0;
}
.payPassPhoneCodeChange{
    color:#CCCCCC;
}


// 提示盒子
.promptFather{
    width:100%;
    position :fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
    display :flex;
    justify-content :center;
    align-items :center;
    z-index:999;
    >.prompt{
        padding:0.2rem 0.35rem;;
        background :rgba(0,0,0,0.7);
        color:#fff;
        border-radius:0.5rem;
        font-size:0.37rem;
    }
}
.fade-enter-active, .fade-leave-active {
//   transition: opacity .5s;
    transition: all .3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
   transform: translateY(0.32rem);
  opacity: 0;
}
</style>