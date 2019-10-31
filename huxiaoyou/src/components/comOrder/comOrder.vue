<!--  -->
<template>
  <div class="comOrder">
       <!-- 隐形的盒子 -->
      <div class="hideOrder"></div>
      <div class="myOrderListHeader">
                <img @click="toMime" class="myOrderListHeaderLeft" :src="staticImgH+'zuojiantou.png'" alt="">
                <span>确认订单</span>
                <span></span>
            </div>
      <div class="comOrder_info">
          <div class="comOrder_infoTitle">订单信息</div>
          <div class="comOrder_infoNum">订单编号：{{comOrder.orderSn}}</div>
          <div class="comOrder_infoMoney">需支付金额：<span>￥{{comOrder.orderAmount}}</span></div>
      </div>
      <div class="comOrder_body">
          <div class="comOrder_bodyTitle">支付方式</div>
          <div class="comOrder_bodyDes" @click="getPayPermit">
              <div class="comOrder_bodyDesTop"><img :src="staticImgH+'weiPay.png'" alt=""><span>微信支付</span></div>
              <img :src="staticImgH+'weiSel.png'" alt="">
            </div>
      </div>
      <!-- 提示盒子 -->
            <transition name="fade">
                <div class="promptFather" v-if="showPrompt">
                    <div class="prompt" >
                        {{promptContent}}
                    </div>
                </div>
            </transition>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
var qs = require('qs');
export default {
  data () {
    return {
        dataResult:'',//
        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
        timer2:'',
    };
  },

//   components: {},

  computed:{
        ...mapState(['comOrder','staticImgH'])
    },

//   mounted: {},

  methods: {
      toMime(){
          this.$router.push('/orderList')
      },
      // 支付 wx.config
            getPayPermit(){
                var PayPermitObj=qs.stringify({
                    order_sn:this.comOrder.orderSn,
                    trade_type:'JSAPI',
                })
                this.$http.post('api/wechat/dopay',PayPermitObj).then((res)=>{
                        if(res.data.code==200){
                            var data=res.data.data
                            this.dataResult=data //微信支付认证信息
                            var vm=this
                            wx.config({
                                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                appId: data.appId, // 必填，公众号的唯一标识
                                timestamp:data.timeStamp, // 必填，生成签名的时间戳
                                nonceStr: data.nonceStr, // 必填，生成签名的随机串
                                signature: data.sign,// 必填，签名
                                jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表
                            });
                            this.payLe()
                        }else{
                            var self=this
                            clearInterval(self.timer2);
                                    this.promptContent=res.data.msg
                                    this.showPrompt=true
                                    self.timer2=setTimeout(function(){
                                        self.showPrompt=false
                                        clearInterval(self.timer2);
                                    },2000)
                                return false;
                        }
                })
            },
        //支付  wx.chooseWXPay
            payLe(){
                    var vm=this
                    wx.ready(function(){
                        wx.chooseWXPay({
                            timestamp: vm.dataResult.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: vm.dataResult.nonceStr, // 支付签名随机串，不长于 32 位
                            package: vm.dataResult.packag, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign:  vm.dataResult.sign, // 支付签名
                            success: function (res) {
                                this.myOrderListPages('/Mine')  //订单列表页返回
                                vm.orderTypes('WAITSEND')  //订单页面orderType
                                vm.orderNums(2)   //订单页面导航下标
                                vm.$router.push('/orderList')  //支付成功后跳订单列表
                            },
                            fail(){
                                alert('支付失败')
                            }
                        });
                    }) 
            },
            ...mapMutations(['myOrderListPages','orderTypes','orderNums','comOrders']),
  }
}

</script>
<style scoped lang='stylus'>
.hideOrder{
    width:100%;
    height:2.06rem;
}
.myOrderListHeader{
    width:100%;
    height:1.23rem;
    background :#fff;
    display :flex;
    justify-content :space-between;
    align-items :center;
    padding:0 0.27rem;
    border-bottom:0.03rem solid #F1F1F1;
    position:fixed;
    top:0;
    left:0;
    >.myOrderListHeaderLeft{
       width:0.32rem;
        height:0.56rem;
    }
    >span{
        font-size:0.53rem;
    }
    >.myOrderListHeaderRight{
        width:0.43rem;
        height:0.45rem;
    }
    
}
// 提示盒子
.promptFather{
    width:100%;
    position :absolute;
    bottom:50%;
    left:0;
    z-index:999;
    display :flex;
    justify-content :center;
    align-items :center;
    >.prompt{
        padding:0.15rem 0.3rem;;
        background :rgba(0,0,0,0.7);
        color:#fff;
        border-radius:0.5rem;
        font-size:0.32rem;
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

.comOrder_body{
   width:9.2rem;
    padding:0.32rem;
    margin:0 auto;
    box-shadow :0 0.05rem 0.3rem rgba(255, 204, 212, 0.5);
    >.comOrder_bodyTitle{
        font-size:0.4rem;
    }
    >.comOrder_bodyDes{
        display :flex;
        justify-content :space-between;
        align-items :center;
        font-size:0.35rem;
        margin-top:0.32rem;
        >img{
            width:0.43rem;
            height:0.43rem;
        }
        >.comOrder_bodyDesTop{
            >img{
                width:0.43rem;
                height:0.43rem;
                margin-right:0.32rem;
            }
        }
    }
}
.comOrder_info{
    width:9.2rem;
    padding:0.32rem;
    font-size:0.347rem;
    margin:0.32rem auto;
    box-shadow :0 0.05rem 0.3rem rgba(255, 204, 212, 0.5);
    >.comOrder_infoTitle{
        font-size:0.43rem;
        color:rgba(0, 0, 0, 1);
        margin-bottom:0.4rem;
    }
    >.comOrder_infoMoney{
        margin-top:0.32rem;
        >span{
            color:rgba(236, 10, 66, 1);
        }
    }
}
</style>