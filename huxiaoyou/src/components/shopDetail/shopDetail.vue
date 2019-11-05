<!-- 卡包详情 -->
<template>
  <div class="shopDetail">
        <!-- header -->
            <div class="shopDetail_header">
                <img class="img_left" @click.stop="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
                <span>卡包详情</span>
                <img @click="shareC" class="img_right" :src="staticImgH+'shopDetailShare.png'" alt="">
            </div>
        <!-- 小轮播 -->
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
        <!-- 商品信息  -->
            <div class="shop_detail">
                    <div class="shop_detailTop"><span>¥{{shopData.shop_price}}</span> <span class="originalPrice">原价：{{shopData.market_price}}</span></div>
                    <div class="shop_detailCenter">购买此卡包可为选手增加{{shopData.goods_vote}}票</div>
                    <div class="shop_detailBottom">{{shopData.goods_name}}</div>
            </div>
        <!-- 商品内容图 -->
            <div class="shopContent" v-html="shopData.goods_content"></div>
        <!-- 立即购买  -->
            <div class="shopDetail_btnWrap">
                <div class="shopDetail_btnone" @click="toPlayStyle">
                    选手视频 
                </div>
                <div  class="shopDetail_btnTwo" @click="toHome">
                    了解更多 
                </div>
                <div  class="shopDetail_btn" @click="AssistTicketOne">
                    立即购买 
                </div>
                    
            </div>
        <!-- 底部隐藏的盒子  -->
            <div class="shopDetail_hide"> 
            </div>
        <!-- 提示盒子 -->
            <transition name="fade">
                <div class="promptFather" v-if="showPrompt">
                    <div class="prompt" >
                        {{promptContent}}
                    </div>
                </div>
            </transition>
        <!-- 提示分享 -->
            <div class="shareText_wrap" v-if="shareTextShow"  @click="hideShare">
                <img :src="staticImgH+'timg.jpg'"/>
                <div class="shareText">
                    点击右上角，为ta分享助力投票
                </div> 
            </div>
        <!-- 订单提交后提示 -->
            <div class="orderTIshi_wrap" @click="sureOrderTi" v-if="orderTIshiSHow">
                <div class="orderTIshi" @click.stop>
                    <span class="orderTIshi_des">您已成功为{{playerId}}号选手{{test.username}}投票{{shopData.goods_vote}}票，将按照所填快递地址寄出精美礼品</span>
                    <span class="orderTIshi_btn" @click="sureOrderTi">确定</span>
                </div>
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
        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
        timer2:'',

        BshopId:'',//定义一个本页面的商品ID对其进行赋值
        BuserIdH:"",//定义一个本页面中需要获得利益的用户ID\

        // 对微信接口获取到的信息进行保存
        unionid:'',  
        miniapp:'',
        nickname:'',
        head_pic:'',
        sex:'',
        test:'',
        shareTextShow:false,//提示分享默认隐藏
        orderTIshiSHow:false,//订单成功后的提示默认隐藏
    };
  },
  components: {},
  computed:{
        ...mapState(['apiH','staticImgH','tokenH','shopgoodId','shopDetailReturn','playerId','addressId','addressIdIsSel','userIdH','WpersonInfoH','userIdHInterest'])
    },
  mounted(){
      this.firstPanduan()
//        // 判断本地有没有用户信息
//         if(this.WpersonInfoH.unionid && this.WpersonInfoH.miniapp && this.WpersonInfoH.nickname && this.WpersonInfoH.head_pic && this.WpersonInfoH.sex){
//             this.unionid=this.WpersonInfoH.unionid
//             this.miniapp=this.WpersonInfoH.miniapp
//             this.nickname=this.WpersonInfoH.nickname
//             this.head_pic=this.WpersonInfoH.head_pic
//             this.sex=this.WpersonInfoH.sex
//             this.Islogin()  //走登录
//         }else{  //否则重新获取code值
//             this.getCodes ()  
//         }
  },

  methods: {
            // 隐藏提交订单提示盒子显示
                   sureOrderTi(){
                       this.orderTIshiSHow=false
                   },
            //   分享提示显示
                    shareC(){
                        this.shareTextShow=true
                    },
            //   隐藏提示分享
                    hideShare(){
                        this.shareTextShow=false
                    },
            //点击了解更多
            toHome(){
                this.$router.push('/')
            },
            // 点击选手视频
            toPlayStyle(){
                this.$router.push('/PlayerStyle')
            },
            firstPanduan(){
                //判断是否是分享出去的
                    // var shopUrl = window.location.href
                    //     //var shopUrl = 'http://mobile.aibebi.cn/aibei/shopList.html?goods_id=1482'
                    //     //截取？后的商品id
                    //     var shopCan, value;  //初始化 
                    //     shopCan = shopUrl.indexOf("#")  //找到？的下标
                    //     shopUrl=shopUrl.substr(shopCan+1)
                    //     shopCan=shopUrl.indexOf('?')
                    //     if(shopCan > 0){
                    //         shopUrl = shopUrl.substr(shopCan + 1)  //截取？后面的内容
                    //         var shopArr = shopUrl.split('&') //分割成数组 
                    //         var shopUrlId = {};// 初始化对象 找到的goodId放到里面
                    //         for(var i = 0; i < shopArr.length; i++) {//循环shopArr数组
                    //             shopCan = shopArr[i].indexOf("=");  //找到=号的下标
                    //             if(shopCan > 0){ //判断有没有=
                    //                 value = shopArr[i].substring(shopCan + 1); //找到=后面的值并截取     =>value
                    //                 shopCan = shopArr[i].substring(0, shopCan);//找到=前面的值  =》key
                    //                 shopUrlId[shopCan] = value;  // key value放到shopUrlId对象里
                    //             }
                    //         }
                    //         if(shopUrlId.user_id && shopUrlId.goods_id){
                    //             this.BuserIdH=shopUrlId.user_id
                    //             this.BshopId=shopUrlId.goods_id
                    //         }else{
                    //             this.BuserIdH=this.userIdHInterest
                    //             this.BshopId=this.shopgoodId
                    //         }
                    //     }else{
                    //             this.BuserIdH=this.userIdHInterest
                    //             this.BshopId=this.shopgoodId
                    //     }
                    this.BuserIdH=this.userIdHInterest
                    this.BshopId=this.shopgoodId
                // 获取商品信息
                    var obj=qs.stringify({
                            goods_id:this.BshopId
                        })
                        this.$http.post('/api/goods/goods_info',obj).then((res)=>{
                            if(res.data.code==200){
                                this.shopData=res.data.data
                                this.galleryImg=res.data.data.image_url
                                //判断是否有没有选中地址
                                if(this.addressIdIsSel=='true'){
                                    this.AssistTicketTwo()
                                }
                                this.WShare()
                            }else{
                                var self=this
                                clearInterval(self.timer2);
                                this.promptContent=res.data.msg
                                this.showPrompt=true
                                self.timer2=setTimeout(function(){
                                    self.showPrompt=false
                                    clearInterval(self.timer2);
                                },1000)
                                return false;
                            }
                        })
                
                    
            },
        // 微信分享
            WShare(){
               //   微信分享
                var Wobj=qs.stringify({
                        player_id:this.playerId,
                        type:2,
                    })
                    this.$http.post('/api/wechat/get_sign',Wobj).then((res)=>{
                        if(res.data.code==200){
                            var data=res.data.data
                            this.test=data
                                wx.config({
                                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                                    appId: data.appId, // 必填，公众号的唯一标识
                                    timestamp:data.timestamp, // 必填，生成签名的时间戳
                                    nonceStr: data.nonceStr, // 必填，生成签名的随机串
                                    signature: data.signature,// 必填，签名
                                    jsApiList: ['onMenuShareAppMessage','onMenuShareTimeline'] // 必填，需要使用的JS接口列表
                                });
                                this.toFriend()
                                this.toFriendQuan()
                        }else{
                                var self=this
                                clearInterval(self.timer2);
                                this.promptContent=res.data.msg
                                this.showPrompt=true
                                self.timer2=setTimeout(function(){
                                    self.showPrompt=false
                                    clearInterval(self.timer2);
                                },1000)
                                return false;
                        }
                })
            },
        //   分享给朋友
            toFriend(){
                        var vm=this
                        var realLocation=vm.apiH+'/#/PlayerDetails?player_id='+vm.playerId 
                        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                            wx.onMenuShareAppMessage({ 
                                title:vm.test.test, // 分享标题
                                desc:'快来给我投票吧', // 分享描述
                                link:vm.apiH+'/static/html/redirect.html?app3Redirect='+encodeURIComponent(realLocation), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl:vm.test.head_pic, // 分享图标
                                success: function (res) {

                                }
                            })
                        });
            },
        //   分享到朋友圈
            toFriendQuan(){
                var vm=this
                var realLocation=vm.apiH+'/#/PlayerDetails?player_id='+vm.playerId 
                wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                        wx.onMenuShareTimeline({
                                title:vm.test, // 分享标题
                                link: vm.apiH+'/static/html/redirect.html?app3Redirect='+encodeURIComponent(realLocation),  // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl:vm.test.head_pic, // 分享图标
                                success: function (res) {
                                },
                        })
                });
            },
        //   返回
            toReturn(){
                if(this.shopDetailReturn=="/PlayerDetails"){
                        this.playerIds(this.playerId)//保存选手id
                        this.playDetailVoteDivs('true') //选手详情的投票盒子的显示
                        this.addressIdIsSels('false') //给选手详情页默认地址没选中状态 
                        this.shopDetatilshows('true')//告诉选手详情是卡包详情返回的
                        this.$router.push('/PlayerDetails')
                }else {
                    this.$router.push(this.shopDetailReturn)
                }
            },
        //   点击立即购买
            AssistTicketOne(){
                this.addressIdIsSels('false')
                this.AssistTicket()
            },
        //   先判断是否有地址
            AssistTicket(){
                    if(this.addressIdIsSel=='false'){   //如果 addressIdIsSel为false 选择获取添加地址
                            this.$http.post("api/user/address_list",obj).then((res)=>{
                                this.shopgoodIds(this.BshopId)  //给商品页传gooid
                                this.userIdHInterests(this.BuserIdH) //给商品页传获得利益的用户Id
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
        // 助力(订单编号)
            AssistTicketTwo(){
                var obj=qs.stringify({
                    goods_id:this.shopgoodId,
                    player_id:this.BuserIdH,
                    address_id:this.addressId
                })
                this.$http.post('api/goods/goods_buyer',obj).then((res)=>{
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
        //  支付  wx.chooseWXPay
            payLe(){
                    this.addressIdIsSels('false')
                    var vm=this
                    wx.ready(function(){
                        wx.chooseWXPay({
                            timestamp: vm.dataResult.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: vm.dataResult.nonceStr, // 支付签名随机串，不长于 32 位
                            package: vm.dataResult.packag, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign:  vm.dataResult.sign, // 支付签名
                            success: function (res) {
                                vm.addressIdIsSels('false')
                                // vm.myOrderListPages('/shopDetail')  //订单列表页返回
                                // vm.orderTypes('WAITSEND')  //订单页面orderType
                                // vm.orderNums(2)   //订单页面导航下标
                                // vm.$router.push('/orderList')  //支付成功后跳订单列表
                                vm.orderTIshiSHow=true
                            },
                            fail(){
                                alert('支付失败')
                            }
                        });
                    }) 
            },
        // 登录接口
            // Islogin(){
            //     var LoginObj=qs.stringify({
            //         unionid:this.unionid,
            //         miniapp:this.miniapp,
            //         nickname:this.nickname,
            //         head_pic:this.head_pic,
            //         sex:this.sex
            //     })
            //     this.$http.post('api/user/logins',LoginObj).then((res)=>{
            //         if(res.data.code==200){
            //             this.userIdHs(res.data.data.result.user_id)
            //             this.tokenHs(res.data.data.result.token)
            //             this.firstPanduan()
            //         }else{
            //             var self=this
            //             clearInterval(self.timer2);
            //                     this.promptContent=res.data.msg
            //                     this.showPrompt=true
            //                     self.timer2=setTimeout(function(){
            //                         self.showPrompt=false
            //                         clearInterval(self.timer2);
            //                     },2000)
            //                 return false;
            //             this.getCodes ()  //code!==200重新获取code
            //         }
            //     })
            // },
            //获取code值
            // getUrlParam(name) {//封装方法
            //     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
            //     var r = window.location.search.substr(1).match(reg); //匹配目标参数
            //     if (r != null) return unescape(r[2]);
            //     return null; //返回参数值
            // },
            // 获取微信用户
            // getCodes () {
            //     const AppId='wx7cb8b9da4ff3bac2';
            //     const code=this.getUrlParam('code')
            //     const local=window.location.href
            //     if(code==null || code===''){
            //         window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppId+'&redirect_uri='+encodeURIComponent(local)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
            //     }else{
            //         var obj=qs.stringify({
            //         code:code
            //         })
            //         this.$http.post('/api/user/user_login',obj).then((res)=>{
            //             if(res.data.code==200){
            //                 var data=res.data.data
            //                 let personInfo={unionid:data.unionid,miniapp:data.openid,nickname:data.nickname,head_pic:data.headimgurl,sex:data.sex}
            //                 this.WpersonInfoHs(personInfo)
            //                 this.unionid=data.unionid
            //                 this.miniapp=data.openid
            //                 this.nickname=data.nickname
            //                 this.head_pic=data.headimgurl
            //                 this.sex=data.sex
            //                 this.Islogin()  
            //             }else{
            //                 var self=this
            //                 clearInterval(self.timer2);
            //                         this.promptContent=res.data.msg
            //                         this.showPrompt=true
            //                         self.timer2=setTimeout(function(){
            //                             self.showPrompt=false
            //                             clearInterval(self.timer2);
            //                         },2000)
            //                     return false;
            //             }
            //         })
            //     }
            // },
          ...mapMutations(['myOrderListPages','orderTypes','orderList','ReceiptAddressPages','ReceiptAddressAddPages','playerIds','addressIdIsSels','playDetailVoteDivs','shopDetatilshows','WpersonInfoHs','tokenHs','shopgoodIds','userIdHs','userIdHInterests'])
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
.shopDetail_btnWrap{
    width:100%;
    height:1.2rem;
    position:fixed;
    bottom:0;
    left:0;
    display:flex;
}
.shopDetail_btnone{
    width:33.333%;
    height:1.2rem;
    background:#FED943;
    font-size:0.37rem;
    color:rgba(255, 255, 255, 1);
    text-align:center;
    line-height:1.2rem;
}
.shopDetail_btnTwo{
    width:33.333%;
    height:1.2rem;
    background:#4AABF9;
    font-size:0.37rem;
    color:rgba(255, 255, 255, 1);
    text-align:center;
    line-height:1.2rem;
}
.shopDetail_btn{
    width:33.333%;
    height:1.2rem;
    background:rgba(255, 157, 172, 1);
    font-size:0.37rem;
    color:rgba(255, 255, 255, 1);
    text-align:center;
    line-height:1.2rem;
}
.shopDetail_hide{
     width:9.2rem;
   height:1.2rem;
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

// 提示盒子
.promptFather{
    width:100%;
    position :absolute;
    bottom:50%;
    left:0;
    z-index:10;
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

.shareText_wrap{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.9);
    position:fixed;
    top:0;
    left:0;
    z-index:999;
    >img{
        width:2.51rem;
        height:auto;
        position:absolute;
        right:0.32rem;
        top:0.32rem;
    }
    >.shareText{
        width:7.733rem;
        height:5.01rem;
        position:absolute;
        left:0;
        right:0;
        top:0;
        bottom:0;
        margin:auto;
        font-size:0.48rem;
        text-align:center;
        padding:0.4rem;
        line-height:1rem;
        color:#fff;
    }
}
.shareText_wrap{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.9);
    position:fixed;
    top:0;
    left:0;
    z-index:999;
    >img{
        width:2.51rem;
        height:auto;
        position:absolute;
        right:0.32rem;
        top:0.32rem;
    }
    >.shareText{
        width:7.733rem;
        height:5.01rem;
        position:absolute;
        left:0;
        right:0;
        top:0;
        bottom:0;
        margin:auto;
        font-size:0.48rem;
        text-align:center;
        padding:0.4rem;
        line-height:1rem;
        color:#fff;
    }
}
// 订单提交后提示
.orderTIshi_wrap{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.9);
    position:fixed;
    left:0;
    top:0;
    z-index:999;
   
    >.orderTIshi{
        width:8rem;
        height:3.84rem;
        background:#fff;
        border-radius:0.133rem;
         display:flex;
        flex-direction:column;
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        margin:auto;
        >.orderTIshi_des{
            width:100%;
            height:3rem;
            font-size:0.373rem;
            color:rgba(0, 0, 0, 1);
            line-height:0.8rem;
            text-align:center;
            padding:0.4rem;
        }
        >.orderTIshi_btn{
            width:100%;
            height:1.253rem;
            font-size:0.373rem;
            color:rgba(255, 57, 36, 1);
            text-align:center;
            line-height:1.253rem;
            border-top:0.03rem solid rgba(204, 204, 204, 0.4);
        }
    }
}
</style>