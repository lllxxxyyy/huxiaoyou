<!-- 提现 -->
<template>
  <div class="withdraw">

      <div class="withdraw_header">
           <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
			 <span>提现</span><span></span>
		</div>
		<div class="withdraw_body">
			<span>提现金额：</span>
			<input @input="inputHandler"  v-model="inputMoneyText" type="text" name="withdrawMoney"   :placeholder="'您最高可提现'+billMoney+'元'">
			<span class="allWithdraw" @click="allWithdraw">全部提现</span>
		</div>
		<div class="withdraw_zhu">
			注：提现平台代为扣税点4%
		</div>
		<div class="withdraw_btn" @click="ImmTi">
			立即提现
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
        inputMoneyText:'',
        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
        timer2:'',
    };
  },

   computed:{
        ...mapState(['staticImgH','tokenH','billMoney','isPerson'])
    },

  mounted: {},

  methods: {
    //   提现
    ImmTi(){
        var obj=qs.stringify({
            total:this.inputMoneyText
        })
        if(!this.inputMoneyText){
            this.alertText('请输入您要提现的金额')
            return
        }else if(this.inputMoneyText>this.billMoney){
             this.alertText('您填写的金额超出可提现金额')
            return
        }else if(this.inputMoneyText<=0){
            this.alertText('提现的金额不能为0')
            return
        }
        this.$http.post('/api/user/user_deposit',obj).then((res)=>{
            if(res.data.code==200){
                 this.alertText('提现成功')
            }else{
                this.alertText(res.data.msg)
            }
        })
    },
    //   全部提现
    allWithdraw(){
        this.inputMoneyText=this.billMoney
    },
    inputHandler() {//金额输入
    let val = aa.replace(/[^\d.]/g, "")//只允许一个小数点              
              .replace(/^\./g, "").replace(/\.{2,}/g, ".")//只能输入小数点后两位
              .replace(".", "$#$")//把第一个'.'替换成'$#$',
              .replace(/\./g, "")//把其余的字符'.'替换为空字符串(删除)
              .replace("$#$", ".")//把字符'$#$'替换回原来的'.'
              .replace(/^(\-)*(\d+)\.(\d{1,2}).*$/, '$1$2.$3')
    this.inputMoneyText=val
},
      toReturn(){
          this.$router.push('/AccountBalance')
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
  }
}

</script>
<style scoped lang="stylus">
.withdraw{
    width:100%;
    height:100%;
    background :#fff;
    padding:0 0.4rem;
}
 .withdraw_header{
    width:100%
    height:1.23rem;
    display :flex;
    align-items :center;
    justify-content :space-between;
    position :relative;
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
.withdraw_body{
    display:flex;
    align-items: center;
    border-bottom:0.03rem solid rgba(0, 0, 0, 0.14);
    padding:0.4rem 0;
}
.withdraw_body>span{
    font-size: 0.427rem;
    color:rgba(0, 0, 0, 1);
    font-weight: 600;
}
.withdraw_body>input{
    flex:1;
    font-size:0.373rem;
    border: 0;
    outline: none;
}
.withdraw_body>.allWithdraw{
    font-size:0.347rem;
    color: rgba(255, 0, 0, 1);
    font-weight:normal;
}
.withdraw_body>input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
    font-size: 0.427rem;
    color:rgba(0, 0, 0, 0.36);
}
.withdraw_zhu{
    font-size:0.347rem;
    color:rgba(255, 0, 0, 1);
    margin-top:0.32rem;
}
.withdraw_btn{
    width:8.67rem;
    height:0.8rem;
    text-align: center;
    line-height: 0.8rem;
    font-size:0.437rem;
    margin:0 auto;
    margin-top:2rem;
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