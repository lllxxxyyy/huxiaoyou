<!-- 实名认证 -->
<template>
  <div class="RealName">
      <div class="RealName_header">
            <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
            <span>实名认证</span>
            <span></span>
      </div>
      <ul class="Certi_center">
			<li><span>姓 名：</span><input name="userName" v-model="userName" type="text" placeholder="请填写您身份证上的名字"></li>
			<li>
				<span>身份证号：</span>
				<input 	name="IDCard" v-model="IDCard" @change="cardNumber"
						type="text"
						maxlength="18" 
						oninput="value=value.replace(/[\W]/g,'')"
						placeholder="请填写您正确的身份证号码">
			</li>
			<li>
				<span>手机号码：</span>
				<input  name="PhoneNum"	 v-model="PhoneNum"
						maxlength="11" 
						oninput = "value=value.replace(/[^\d]/g,'')" 
						type="text"  
						placeholder="请填写您正确的手机号码">
			</li>
			<li><span>银行卡号：</span><input v-model="BankCard" oninput ="value=value.replace(/[^\w_]/g,'')" maxlength="19" name="BankCard" type="" placeholder="请填写您正确的银行卡号"></li>
		</ul>
        <div class="withdraw" @click="toti">
            提交
        </div>
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
        userName:'',
        IDCard:'',
        PhoneNum:'',
        BankCard:'',
        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
        timer2:'',
    };
  },

//   components: {},

  computed:{
        ...mapState(['staticImgH','tokenH','billMoney','isPerson'])
    },

//   mounted: {},

  methods: {
      // 身份证验证
        cardNumber(){
            var idCardReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
            iFlag = idCardReg.test(this.idNumber);
            if(!iFlag){
                this.alertText('您输入的身份证格式有误！')
            }
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
                this.$router.push('/AccountBalance')
            },
        //   提交
            toti(){
                var type=""
                if(this.isPerson==1){
                    type=2  //选手
                }else if(this.isPerson==0){
                    type=1  //用户
                }
                var obj=qs.stringify({
                    mobile:this.PhoneNum,
                    real_name:this.userName,
                    id_card:this.IDCard,
                    bank_card:this.BankCard,
                    type:type,
                })
                this.$http.post('api/user/real_Name',obj).then((res)=>{
                    var realInfo={mobile:this.PhoneNum,real_name:this.userName,id_card:this.IDCard,bank_card:this.BankCard}
                    this.realInfos(realInfo)
                    if(res.data.code==200){
                        this.$router.push('/SMS')
                    }else {
                        this.alertText(res.data.msg)
                    }
                })
                // var obj=qs.stringify({
                //     total:
                // })
                // this.$http.post('api/user/user_deposit',obj).then((res)=>{
                //     console.log(res)
                // })
            },
            ...mapMutations(['realInfos']),
  }
}

</script>
<style scoped lang="stylus">
.RealName{
    width:100%;
    height :100%;
    background :#fff;
}
 .RealName_header{
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
			font-size:0.453rem;
			outline:none;
			border:0;
	}
    .Certi_center>li>input::-webkit-input-placeholder {
    font-size: 0.347rem;
}
.withdraw{
      width:9.2rem;
			height:0.8rem;
			text-align: center;
			line-height: 0.8rem;
			font-size:0.347rem;
			margin:0 auto;
			margin-top:2.13rem;
			background: rgba(255, 157, 172, 1);
			border-radius: 0.67rem;
			color:rgba(255, 255, 255, 1);
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