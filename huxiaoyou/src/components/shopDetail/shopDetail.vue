<!-- 卡包详情 -->
<template>
  <div class="shopDetail">
      <div class="shopDetail_header">
          <img class="img_left" @click.stop="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
          <span>卡包详情</span>
         <img class="img_right" :src="staticImgH+'shopDetailShare.png'" alt="">
      </div>
      
      <div class="shopDetail_con">
        <div class="KcodeShopHeader">
                <!-- 轮播图 -->
                <swiper class="KcodeShopSwiper"  :options="swiperOption">
                    <swiper-slide class="KcodeShopSwiperList"  v-for="(item,index) in galleryImg" :key="index">
                        <img :src="item.image_url" alt=""></swiper-slide>
                    <div class="swiper-pagination KcodeShopPage" slot="pagination"></div>
                </swiper>
        </div>
      </div>
        <div class="shop_detail">
                <div class="shop_detailTop"><span>¥{{shopData.shop_price}}</span> <span class="originalPrice">原价：156.00</span></div>
                <div class="shop_detailCenter">购买此卡包可为选手增加990票</div>
                <div class="shop_detailBottom">{{shopData.goods_name}}</div>
        </div>
        <div class="shopContent" v-html="shopData.goods_content"></div>
        <div class="shopDetail_btn" @click="AssistTicket">
                立即购买 
        </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import wx from 'weixin-jsapi'
import qs from 'qs'
export default {
  data () {
    return {
        galleryImg:'',//轮播图数据
        shopData:'',//商品信息
        // 轮播图
         swiperOption: {
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction'
          },
          autoplay: {
            delay: 1500,
            stopOnLastSlide: false,
            disableOnInteraction: false
          },
          loop: true,
        },
    };
  },

  components: {},

  computed:{
        ...mapState(['staticImgH','tokenH','shopgoodId','shopDetailReturn','playerId','addressId','addressIdIsSel'])
    },

  mounted(){
      
      if(this.addressIdIsSel=='true'){
            this.AssistTicketTwo()
      }
      var obj=qs.stringify({
          goods_id:this.shopgoodId
      })
      this.$http.post('/api/goods/goods_info',obj,{
           headers: {
                'authorization': this.tokenH
            }
      }).then((res)=>{
         if(res.data.code==200){
             this.shopData=res.data.data
             this.galleryImg=res.data.data.image_url
         }else{
         }
      })
  },

  methods: {
      toReturn(){
          if(this.shopDetailReturn=="/PlayerDetails"){
                this.playerIds(this.playerId)//保存选手id
                this.addressIdIsSels('false') //给选手详情页默认地址没选中状态 
                this.playDetailVoteDivs('true') //选手详情的投票盒子的显示
                this.shopDetatilshows('true')//告诉选手详情是卡包详情返回的
                this.$router.push('/PlayerDetails')
          }
      },
       //   先判断是否有地址
    AssistTicket(){
            if(this.addressIdIsSel=='false'){   //如果 addressIdIsSel为false 选择获取添加地址
                    var obj=qs.stringify({
                    })
                    this.$http.post("api/user/address_list",obj,{
                        headers: {
                                'authorization': this.tokenH
                            }
                    }).then((res)=>{
                        if(res.data.data.length){  //跳选择地址列表页面
                            this.ReceiptAddressPages('/shopDetail')
                            this.$router.push('/ReceiptAddress')
                        }else{  //跳添加地址列表页面
                            this.ReceiptAddressAddPages('/shopDetail')
                            this.$router.push('/ReceiptAddressAdd')
                        }
                    })
                }else if(this.addressIdIsSel=='true'){  //否则进行支付
                        this.AssistTicketTwo()
                }
        },
         // 助力
    AssistTicketTwo(){
          var obj=qs.stringify({
              goods_id:this.shopgoodId,
              player_id:this.playerId,
              address_id:this.addressId
          })
          this.$http.post('api/goods/goods_buyer',obj,{
                headers: {
                        'authorization': this.tokenH
                    }
            }).then((res)=>{
              if(res.data.code==200){
                  this.orderSn=res.data.data.result  //订单编号
                  this.getPayPermit()
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
     //   支付 wx.config
        getPayPermit(){
            var PayPermitObj=qs.stringify({
                order_sn:this.orderSn,
                trade_type:'JSAPI',
            })
            this.$http.post('api/wechat/dopay',PayPermitObj,{
                    headers: {
                            'authorization': this.tokenH
                        }
                }).then((res)=>{
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
                            this.addressIdIsSels('false')
                            this.myOrderListPages('/shopDetail')  //订单列表页返回
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
          ...mapMutations(['myOrderListPages','orderTypes','orderList','ReceiptAddressPages','ReceiptAddressAddPages','playerIds','addressIdIsSels','playDetailVoteDivs','shopDetatilshows'])
    },
   
}

</script>
<style scoped lang="stylus">
.shopDetail_header{
    width:100%
    height:1.23rem;
    display :flex;
    align-items :center;
    justify-content :space-between;
    position :fixed;
    top:0;
    left:0;
    padding:0 0.53rem;
    z-index:999;
    >.img_left{
         width:0.32rem;
        height:0.56rem;
    }
    >span{
        font-size:0.48rem;
    }
    >.img_right{
        width:0.53rem;
        height:0.53rem;
    }
}
.KcodeShopHeader>.KcodeShopSwiper{
    width:100%;
    height:9.7rem;
    position :relative;
    .KcodeShopSwiperList{
        >img{
            width:100%;
            height:9.7rem;
        }
    }
}
.KcodeShopHeader>.KcodeShopSwiper>.KcodeShopPage{
    width:1.07rem;
    height:0.53rem;
    font-size:0.32rem;
    background :rgba(0,0,0,0.5);
    line-height: 0.53rem;
    text-align :center;
    border-radius:0.35rem;
    color :#fff;
    position :absolute;
    left:8.53rem;
    bottom:0.27rem;
}
.shop_detail{
    background:#fff;
    padding:0.4rem 0.53rem;
    margin-bottom:0.32rem;
    >.shop_detailTop{
        font-size:0.53rem;
        color:rgba(236, 10, 66, 1);
        display:flex;
        >.originalPrice{
            margin-left:0.4rem;
            text-decoration: line-through;
            color:rgba(0, 0, 0, 0.36);
        }
    }
    >.shop_detailCenter{
        color:rgba(255, 157, 172, 1);
        font-size:0.32rem;
        margin-bottom:0.32rem;
        margin-top:0.373rem;
    }
    >.shop_detailBottom{
        font-size:0.48rem;
        color:rgba(0, 0, 0, 0.8);
        line-height:0.667rem;
    }
}
.shopDetail_btn{
    width:9.2rem;
    height:0.8rem;
    background:rgba(255, 157, 172, 1);
    font-size:0.347rem;
    color:rgba(255, 255, 255, 1);
    text-align:center;
    line-height:0.8rem;
    border-radius:0.667rem;
    margin:0 auto;
    margin-top:0.4rem;
    position:fixed;
    bottom:0.27rem;
    left:50%;
    margin-left:-4.6rem;
}

.shopContent{
    width:100%;

    >>>p{
        width:100%;
        >img{
            width:100%;
        }
    }
}
</style>