<!-- 选手详情 -->
<template>
    <div>
        <!-- header -->
            <div class="PlayerRanking_header">
                <img @click.stop="toReturn" :src="staticImgH+'zuojiantouWhite.png'" alt="">
                <span @click.stop="toPlayDetailstyle">选手视频</span>
            </div>
        <!-- 小轮播 -->
            <div @click.stop class="small_Carousel" v-if="smallSwiper.length>=1">
                        <!-- swiper v-if="comment.length>=1" 为了解决swiper不循环轮播 -->
                <swiper v-if="smallSwiper.length>=1" class="small_swiperWrap" :options="swiperOption">
                    <swiper-slide class="swiperSlide" v-for="(item,index) in smallSwiper" :key="index">感谢「 <img :src="item.head_pic"><span>{{item.nickname}}</span>」为我助力投票{{item.amount}}票</swiper-slide>
                </swiper>
            </div>
        <!--顶部大头像  -->
            <div @click.stop="changeBigImg(detailData.head_pic)" class="playerBigImg" >
                <img :src="staticImgH+'mineBg.png'" alt="">
            </div>
        <!-- 选手信息 -->
            <div class="player_des">
                    <div class="player_des_top">
                        <div class="player_desImg"><img  :src="detailData.head_pic" alt=""></div>
                        <ul>
                            <li><span class="username">{{detailData.username}}</span>
                                <span @click="toMineInfo" v-if="personData.player_id==playerId">编辑</span>
                                <img @click="toMineInfo" v-if="personData.player_id==playerId" :src="staticImgH+'playBian.png'" alt="">
                            </li>
                            <li><span>{{detailData.names}}</span></li>
                        </ul>
                    </div>
                    <ul class="player_des_center">
                        <li> <span class="playerId">参赛编号：{{detailData.player_id}}</span></li>
                        
                    </ul>
                    <ul class="piao_list">
                        <li>
                            <span class="piao_list_top">{{detailData.votes}}</span><span class="piao_list_bottom">总票数</span>
                        </li>
                        <li>
                            <span class="piao_list_top">{{detailData.division_ranking}}</span><span class="piao_list_bottom">赛区排名</span>
                        </li>
                        
                </ul>
                <div class="palylike" v-if="detailData.signature">{{detailData.signature}}</div>
                <ul class="player_listdes">
                    <li>
                        <span v-if="detailData.sex==2">女</span><span v-if="detailData.sex==1">男</span>
                    </li>
                    <li><span v-if="detailData.age!==0">{{detailData.age}}岁</span></li>
                    <li v-if="detailData.city">{{detailData.city}}</li>
                    <li v-if="detailData.constellation">{{detailData.constellation}}</li>
                    <li v-if="detailData.height">{{detailData.height}}cm</li>
                    <li v-if="detailData.weight">{{detailData.weight}}kg</li>
                    <li v-if="detailData.union_id">公会成员</li>
                </ul>
                <div class="player_btnList">
                    <span class="voteBtn" @click.stop="vote">投票</span>
                    <!-- <span class="attentionBtn" v-if="personData.is_player==0">+关注</span> -->
                    <span class="shareBtn" @click.stop="shareC">为Ta分享</span>
                    <span class="EnterBtn" @click="tocanSai" v-if="personData.is_player==0">我也参赛</span>
                    <span class="playerVideoBtn" @click.stop="toPlayDetailstyle">选手视频</span>
                </div>
            </div>
        <!-- 视频 -->
            <div class="palyerVideo_wrap" v-if="detailData.user_introduction">
                <div class="palyerVideo" v-if="detailData.user_introduction"> 
                    <video id="video1"  :poster="detailData.user_introduction[0].src+'?x-oss-process=video/snapshot,t_10000,m_fast'">
                        <source :src="detailData.user_introduction[0].src" type="video/mp4" />
                    </video>
                    <div class="zz" @click.stop="goGoodsPage()"></div>
                </div>
            </div>
        <!-- 小图 -->
            <ul class="playerImg_list">
                <li @click="changeBigImg(item.src)" v-for="(item,index) in detailData.photo_introduction" :key="index">
                    <img :src="item.src" alt="">
                </li>
            </ul>
      <!-- 大图 -->
            <ul class="BigplayerImg_list" v-if="showBigPlayImg" @click="hideBigPlayImg">
                    <img :src="itemSrc" alt="">
            </ul>
      <!-- 投票盒子 -->
            <div class="vote_wrap" v-if="voteShow" @click.stop="hideVote">
                <div class="vote"  @click.stop>
                    <!-- 免费票 -->
                    <div class="FreeTicket">
                        <span class="FreeTicket_title">每日免费投票 <span>（每人每天可投两票）</span></span>
                        <span class="FreeTicket_btn" @click.stop="freeticket">立即投票</span>
                    </div>
                    <!-- 助力票 -->
                    <div class="AssistTicket">
                            <div class="AssistTicket_title"> <span class="AssistTicket_title_first">卡包助力投票</span><span>(分享卡包，成功购买可获得卡包金额10倍的票数)</span> </div>  
                            <span class="AssistTicket_text">助力票为实物，投票后请输入正确的收获地址，我司正常发货。</span>
                            <div class="SpecialTopicBody_bar">
                                <!-- 商品列表 -->
                                <ul>
                                    <li  :class="barcolorIndex==index?'SpecialTopicBody_barColor':''" @click.stop="getShopDes(item.goods_id,index,item.vote)" v-for="(item,index) in shopList" v-if=" Number(index+1)" :key="index">
                                        <img :src="item.original_img" alt="">
                                        <span @click.stop="toshopdetail(item.goods_id,item.vote)">查看详情>></span>
                                    </li>
                                </ul>
                            </div>
                            <div class="AssistTicket_btn" @click.stop="AssistTicket">立即投票</div>
                    </div>
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
        <!-- 提示分享 -->
        <div class="shareText_wrap" v-if="shareTextShow"  @click="hideShare">
            <img :src="staticImgH+'timg.jpg'"/>
            <div class="shareText">
                点击右上角，为ta分享助力投票
            </div> 
        </div>
        <!-- 分享成功提示 -->
            <div class="share_success_wrap" v-if="ShowShareSuccess">
                <div class="share_success">
                     <img  class="firstEnter_chaimg" @click="shareSuccessCha" :src="staticImgH+'cha.png'" alt="">
                    <img class="add_successImg" :src="staticImgH+'share_success.png'">
                </div>
            </div>
        <!-- 订单提交后提示 -->
            <div class="orderTIshi_wrap" @click="sureOrderTi" v-if="orderTIshiSHow">
                <div class="orderTIshi" @click.stop>
                    <span class="orderTIshi_des">您已成功为{{playerId}}号选手{{detailData.username}}投票{{shopVotes}}票，将按照所填快递地址寄出精美礼品</span>
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
    name:"PlayerDetails",
  data () {
    return {
        // 小轮播
        swiperOption: {//swiper3
            direction: 'vertical',
            observer:true,
            observeParents:true,
            loop:true,
            autoplay: {
            　　    disableOnInteraction: false,
            　　},
            speed:300,
        },
        shareTextShow:false,//提示分享默认消失
        ShowShareSuccess:false,
        voteShow:false,   //投票盒子默认消失
        detailData:'',   //选手信息数据
        shopList:'',  // 商品列表数据
        personData:'',  //个人用户信息（这里主要用到免费票数）
        smallSwiper:'',//顶部小轮播数据
        playerInterest:'',//获得利益的选手Id
        itemSrc:'',//初始化大图地址
        shopVotes:'',//商品票数
        orderTIshiSHow:false,//订单提示默认隐藏
        
        test:'',  //微信分享的认证数据
        dataResult:'',  //微信支付认证信息数据
        orderSn:'',//订单编号

        goodId:'',  //商品id
        barcolorIndex:-1,  //商品被选中下标
        bigPlayImgIndex:-1,//变大图的图片下标默认-1
        showBigPlayImg:false,//默认大图盒子消失

        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
        timer2:'',
    };
  },

//   components: {},

   computed:{
            ...mapState(['staticImgH','playerId','addressIdIsSel','addressId','PlayerDetailPage','playDetailVoteDiv','tokenH','playDetailShopDES','apiH','shopDetatilshow','barcolorIndexShop','shopgoodId','Shopvote'])
        },
  mounted(){
    //  判断是否是分享出去的
        var shopUrl = window.location.href
            //var shopUrl = 'http://mobile.aibebi.cn/aibei/shopList.html?goods_id=1482'
            //截取？后的商品id
            var shopCan, value;  //初始化 
            shopCan = shopUrl.indexOf("#")  //找到？的下标
            shopUrl=shopUrl.substr(shopCan+1)
            shopCan=shopUrl.indexOf('?')
            if(shopCan > 0){
                shopUrl = shopUrl.substr(shopCan + 1)  //截取？后面的内容
                var shopArr = shopUrl.split('&') //分割成数组 
                var shopUrlId = {};// 初始化对象 找到的goodId放到里面
                for(var i = 0; i < shopArr.length; i++) {//循环shopArr数组
                    shopCan = shopArr[i].indexOf("=");  //找到=号的下标
                    if(shopCan > 0){ //判断有没有=
                        value = shopArr[i].substring(shopCan + 1); //找到=后面的值并截取     =>value
                        shopCan = shopArr[i].substring(0, shopCan);//找到=前面的值  =》key
                        shopUrlId[shopCan] = value;  // key value放到shopUrlId对象里
                    }
                }
                if(shopUrlId.player_id){
                    this.playerIds(shopUrlId.player_id)
                }
        }
    //   选手信息
        var obj=qs.stringify({
                player_id:this.playerId  
            })
            this.$http.post('/api/player/info',obj,{
                headers: {
                    'authorization':this.tokenH
                }
            }).then((res)=>{
                if(res.data.code==200){
                    this.detailData=res.data.data
                    this.playerInterest=this.detailData.user_id
                    //判断是否显示助力盒子
                        if(this.playDetailVoteDiv=='true'){   //  playDetailVoteDiv 是判断投票盒子是否显示
                            this.voteShow=true    //显示助力盒子
                            if(this.addressIdIsSel=='true'){   //addressIdIsSel   是判断地址是否选中 或者 没有地址是否添加上地址了 ture为有地址可以走支付
                                this.goodId=this.playDetailShopDES.goodsId   
                                this.playerInterest=this.playDetailShopDES.playerId
                                this.barcolorIndex=this.playDetailShopDES.barcolorIndex   //被选中商品下标
                                this.AssistTicketTwo()
                            }else if(this.shopDetatilshow=='true'){ //单纯的选中商品
                                this.goodId=this.shopgoodId
                                this.barcolorIndex=this.barcolorIndexShop
                            }
                        }else if(this.playDetailVoteDiv=='false'){
                            this.voteShow=false  //隐藏助力盒子
                        }
                        this.toshare()
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
    //   助力商品列表
        this.$http.post('/api/goods/goods_list',obj,{
            headers: {
                    'authorization': this.tokenH
                }
            }).then((res)=>{
                if(res.data.code==200){
                    this.shopList=res.data.data.result
                    if(this.Shopvote){
                        this.shopVotes=this.Shopvote
                    }
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
    //   获取免费票数 
        this.getpaioNUm()
    //   微信分享
        
    //  获取小轮播数据
        this.$http.post('/api/first/vote_list',obj,{
                headers: {
                        'authorization': this.tokenH
                    }
            }).then((res)=>{
                this.smallSwiper=res.data.data
        })
  },
  methods: {
      //   分享
    toshare(){
            var Wobj=qs.stringify({
                player_id:this.playerId,
                type:2,
            })
            this.$http.post('/api/wechat/get_sign',Wobj).then((res)=>{
                if(res.data.code==200){
                    var data=res.data.data
                    this.test=data.test
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
      // 跳视频页
        goGoodsPage() {
                this.$router.push({path:'/videoDetail',query:{videoSrc:this.detailData.user_introduction[0].src}})
          },
        // 隐藏提交订单提示盒子显示
                   sureOrderTi(){
                       if(this.PlayerDetailPage){
                            this.orderTIshiSHow=false
                        }else{
                            this.$router.push('/')
                        }
                   },
        // 去参赛
            tocanSai(){
                this.$router.push('/SignUp')
            },
        //   隐藏提示分享
            hideShare(){
                this.shareTextShow=false
            },
        //   分享
            shareC(){
                this.shareTextShow=true
            },
        // 到选手详情风采
            toPlayDetailstyle(){
                this.playerNames(this.detailData.username)  //设置选手详情风采页的标题名字
                this.playerIds(this.playerId)   //给选手详情风采页传playerId
                this.$router.push('/playDetailStyle')
            },
        //点击编辑
            toMineInfo(){
                this.addressIdIsSels('false') //设置地址没选中
                this.playDetailVoteDivs('false') //选手详情的投票盒子的消失
                this.MineInformationPages('/PlayerDetails')
                this.$router.push('/MineInformation')
            },
        //分享成功提示上的X
            shareSuccessCha(){
                this.ShowShareSuccess=false
            },
        //   点击投票
            vote(){
                this.addressIdIsSels('false')   // 每点击投票 重置为未选中地址状态
                this.shopDetatilshows('false')  //
                this.goodId=''  //每点击投票 商品id重置为空
                this.voteShow=true   //投票盒子显示
            },              
        // 助力票 （立即投票按钮）
            AssistTicket(){
                // 先判断有没有goodId
                if(this.goodId==''){
                    var self=this
                    clearInterval(self.timer2);
                    this.promptContent='请先选择商品'
                    this.showPrompt=true
                    self.timer2=setTimeout(function(){
                        self.showPrompt=false
                        clearInterval(self.timer2);
                    },1000)
                    return false;
                }else{ //否则判断有没有地址
                        if(this.addressIdIsSel=='false'){   //如果 addressIdIsSel为false 选择获取添加地址
                            var obj=qs.stringify({
                            })
                            this.$http.post("api/user/address_list",obj,{
                                headers: {
                                        'authorization': this.tokenH
                                    }
                            }).then((res)=>{
                                this.playDetailVoteDivs('true')  //设置为true是为了返回到当前页面的时候 助力盒子显示
                                this.playDetailShopDESs({goodsId:this.goodId,playerId:this.detailData.user_id,barcolorIndex:this.barcolorIndex})  //保存信息，为返回到当前页面的时候可以进行支付
                                if(res.data.data.length){  //跳选择地址列表页面
                                    this.ReceiptAddressPages('/PlayerDetails')
                                    this.$router.push('/ReceiptAddress')
                                }else{  //跳添加地址列表页面
                                    this.ReceiptAddressAddPages('/PlayerDetails')
                                    this.$router.push('/ReceiptAddressAdd')
                                }
                            })
                        }else if(this.addressIdIsSel=='true'){  //否则进行支付
                                this.AssistTicketTwo()
                        }
                }
            },
        // 助力
            AssistTicketTwo(){
                var obj=qs.stringify({
                    goods_id:this.goodId,
                    player_id:this.playerInterest,
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
        // 支付 wx.config
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
                    this.addressIdIsSels('false') //商品页默认地址不选中
                    var vm=this
                    wx.ready(function(){
                        wx.chooseWXPay({
                            timestamp: vm.dataResult.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                            nonceStr: vm.dataResult.nonceStr, // 支付签名随机串，不长于 32 位
                            package: vm.dataResult.packag, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                            signType: 'MD5', // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                            paySign:  vm.dataResult.sign, // 支付签名
                            success: function (res) {
                                alert(JSON.stringify(res))
                                 vm.addressIdIsSels('false') //商品页默认地址不选中
                                 vm.orderTIshiSHow=true
                                // this.myOrderListPages('/PlayerDetails')  //订单列表页返回
                                // vm.orderTypes('WAITSEND')  //订单页面orderType
                                // vm.orderNums(2)   //订单页面导航下标
                                // vm.$router.push('/orderList')  //支付成功后跳订单列表
                            },
                            fail(){
                                alert('支付失败')
                            }
                        });
                    }) 
            },
        //   到商品id
            toshopdetail(goodid,vote){
                this.addressIdIsSels('false') //商品页默认地址不选中
                this.shopDetatilshows('true')  // 判断是不是商品详情页返回到此页面
                this.playDetailVoteDivs('true')  //设置为true是为了返回到当前页面的时候 助力盒子显示
                this.barcolorIndexShops(this.barcolorIndex) //为了返回到当前页面的时候 显示哪个商品被选中状态
                this.Shopvotes(vote)//为了返回到当前页面的时候 保存商品的票数
                this.shopDetailReturns('/PlayerDetails')//商品页返回哪
                this.shopgoodIds(goodid)  //给商品页传gooid
                this.playerIds(this.playerId)  //保存当前选手的playerID
                this.userIdHInterests(this.detailData.user_id)  //给商品页传获得利益的选手编号
                this.$router.push('/shopDetail')  
            },
        //   隐藏放大的图片
            hideBigPlayImg(){
                this.showBigPlayImg=false
            },
        //   显示大图
            changeBigImg(item){
                this.showBigPlayImg=true
                this.itemSrc=item
            },
        //   分享给朋友
            toFriend(){
                        var vm=this
                        var realLocation=vm.apiH+'/#/PlayerDetails?player_id='+vm.playerId 
                        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                            wx.onMenuShareAppMessage({ 
                                title:vm.test, // 分享标题
                                desc:'我在参加第二季天使旅行家大赛，一起领略美食、美景、美女。参赛即刻领红包。', // 分享描述
                                link:vm.apiH+'/static/html/redirect.html?app3Redirect='+encodeURIComponent(realLocation), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl: vm.detailData.head_pic, // 分享图标
                                success: function (res) {
                                            var GetVotesData=qs.stringify({
                                                type:3,
                                                amount:1
                                            })
                                            vm.$http.post('api/user/get_votes',GetVotesData).then((resTwo)=>{
                                                if(res.data.code==200){
                                                    this.ShowShareSuccess=true
                                                }else{
                                                    clearInterval(vm.timer2);
                                                    vm.promptContent=resTwo.data.msg
                                                    vm.showPrompt=true
                                                    vm.timer2=setTimeout(function(){
                                                        vm.showPrompt=false
                                                        clearInterval(vm.timer2);
                                                    },2000)
                                                    return false;
                                                }
                                            })
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
                                imgUrl:vm.detailData.head_pic, // 分享图标
                                success: function (res) {
                                        var GetVotesData=qs.stringify({
                                                type:3,
                                                amount:1
                                            })
                                            vm.$http.post('api/user/get_votes',GetVotesData).then((resTwo)=>{
                                                if(res.data.code!==200){
                                                    alert('yes')
                                                    clearInterval(vm.timer2);
                                                    vm.promptContent=resTwo.data.msg
                                                    vm.showPrompt=true
                                                    vm.timer2=setTimeout(function(){
                                                        vm.showPrompt=false
                                                        clearInterval(vm.timer2);
                                                    },2000)
                                                    return false;
                                                }
                                            })
                                },
                        })
                });
            },
        //   隐藏投票盒子
            hideVote(){
                this.voteShow=false
                this.barcolorIndex=-1
            },
        // 获取goodid
            getShopDes(goodId,index,vote){
                this.barcolorIndex=index  //被选中下标
                this.goodId=goodId   
                this.shopVotes=vote
                this.Shopvotes(vote)//为了返回到当前页面的时候 保存商品的票数
            },
        //  返回
            toReturn(){
                if(this.PlayerDetailPage){
                    this.$router.push(this.PlayerDetailPage)  //PlayerDetailPage（vuex中全局定义，动态设置返回页面）
                }else{
                    this.$router.push('/')
                }
            },
        // 获取免费票数  
            getpaioNUm(){
                var obj=qs.stringify({
                    })
                    this.$http.post('api/user/info',obj,{
                        headers: {
                            'authorization': this.tokenH
                        }
                    }).then((res)=>{
                        if(res.data.code==200){
                            this.personData=res.data.data
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
        //   免费票（点击投票）
            freeticket(){
                var obj=qs.stringify({
                    player_id:this.playerId
                })
                this.$http.post('api/user/spend_vote',obj,{
                    headers: {
                            'authorization':this.tokenH
                        }
                }).then((res)=>{
                    if(res.data.code==200){
                        var self=this
                        clearInterval(self.timer2);
                                this.promptContent='投票成功'
                                this.showPrompt=true
                                self.timer2=setTimeout(function(){
                                    self.showPrompt=false
                                    clearInterval(self.timer2);
                                },2000)
                            return false;
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
        ...mapMutations(['playDetailVoteDivs','ReceiptAddressPages','ReceiptAddressAddPages','orderTypes','orderNums','playDetailShopDESs','addressIdIsSels','myOrderListPages','playerIds','shopgoodIds','barcolorIndexShops','shopDetatilshows','shopDetailReturns','userIdHs','userIdHInterests','playerNames','MineInformationPages','Shopvotes']),   
      },
   
   

}

</script>
<style scoped lang="stylus">
// header  
.PlayerRanking_header{
    width:100%
    height:1.23rem;
    display :flex;
    align-items :center;
    justify-content :space-between;
    position :fixed;
    top:0;
    left:0;
    padding: 0 0.4rem;
    overflow:hidden;
    >img{
        width:0.53rem;
    }
    >span{
        font-size:0.427rem;
        color:#fff;
    }
}
.playerBigImg{
     width:100%;
    height:5.573rem;
    display :flex;
    >img{
        width: 100%;
        height: 100%;
        object-fit: cover;
        z-index:-1;
    }
}
// 选手详情
.player_des{
    width:9.2rem;
    display :flex;
    flex-direction :column;
    background :#fff;
    box-shadow :0 0rem 0.3rem rgba(254, 208, 215, 0.5);
    border-radius:0.4rem 0.4rem 0 0rem;
    margin:0 auto;
    margin-top:-3.73rem;
    padding:0 0.35rem;
    .player_des_top{
        display :flex;
        >.player_desImg{
            width:1.87rem;
            height:1.87rem;
            margin-top:-0.53rem;
            margin-right:0.32rem;
            border:0.1rem solid rgba(255, 255, 255, 1);
            border-radius:50%;
            >img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius:50%;
            }
        }
        >ul{
            margin-top:0.333rem;
            display:flex;
            flex-direction :column;
            >li{
                font-size:0.347rem;
                color:rgba(0, 0, 0, 0.36);
                line-height :0.747rem;
                text-align:center;
                border-radius:0.08rem;
                display:flex;
                align-items:center;
                font-size:0.32rem;
                >.username{
                    font-size:0.53rem;
                    color:rgba(51, 51, 51, 1);
                    line-height:0.747rem;
                    margin-right:0.32rem;
                }
                >img{
                    width:0.293rem;
                    height:0.293rem;
                    margin-right:0.347rem;
                }
            }
        }
    }
    .player_des_center{
        display:flex;
        align-items:center;
        >li{
            font-size:0.347rem;
            color:rgba(0, 0, 0, 1);
            margin-right:0.32rem;
            >.playerId{
                margin-top:0.16rem;
                line-height:0.493rem;
                color:rgba(0, 0, 0, 1);
            }
            
        }
       
    }
    >.piao_list{
        width:100%;
        display :flex;
        align-items :center;
        margin-bottom:0.4rem;
        position:relative;
        padding-left:0.25rem;
        >span{
            position:absolute;
            top:0.24rem;
            right:0;
            font-size:0.32rem;
            color:rgba(0, 0, 0, 0.36);
        }
        >li{
            display :flex;
            flex-direction :column;
            align-items :center;
            margin-right:1.07rem;
            >.piao_list_top{
                font-size:0.55rem;
                color:rgba(51, 51, 51, 1);
                line-height :0.727rem;
                margin-bottom:0.08rem;
            }
            >.piao_list_bottom{
                font-size:0.32rem;
                color:rgba(0, 0, 0, 0.36);
                line-height:0.44rem;
            }
        }
    }
    >.palylike{
        line-height:0.53rem;
        font-size:0.373rem;
        color:rgba(0, 0, 0, 1);
    }
    >.player_desName{
        font-size:0.53rem;
        color:rgba(0, 0, 0, 1);
        margin-bottom:0.2rem;
        >span{
            font-size:0.32rem;
            color:rgba(0, 0, 0, 0.36);
            margin-left:0.32rem;
            margin-top:0.32rem;
        }
    }
    
    .player_listdes{
        display:flex;
        margin-top:0.32rem;
        margin-bottom:0.4rem;
        >li{
            font-size:0.32rem;
            color:rgba(0, 0, 0, 0.36);
            margin-right:0.32rem;
            &:last-child{
                margin-right:0;
            }
            >img{
                width:0.27rem;
                height:0.27rem;
            }
        }
    }
    .player_btnList{
        display:flex;
        flex-wrap:wrap;
        margin-bottom:0.53rem;
        letter-spacing:0.04rem;
        >span{
            padding:0.2rem 0.24rem;
            font-size:0.4rem;
            border-radius:0.5rem;
            margin-right:0.1rem;
            margin-bottom:0.2rem;
            &:last-child{
                margin-right:0;
            }
        }
        >.voteBtn{
            background:rgba(252, 64, 93, 1);
            color:#fff;
        }
        >.attentionBtn{
            background:rgba(16, 137, 235, 1);
            color:#fff;
        }
        >.shareBtn{
            background:rgba(16, 137, 235, 1);
            color:#fff;
        }
        >.EnterBtn{
            background:rgba(23, 205, 170, 1);
            color:#fff;
        }
        >.playerVideoBtn{
             background:rgba(236, 189, 0, 1);
            color:#fff;
        }
    }
    >.playNum{
        font-size:0.32rem;
        color:rgba(0, 0, 0, 1);
        margin-bottom:0.35rem;
    }
    
    >.player_desBtn{
        width:1.87rem;
        height:0.747rem;
        border-radius:0.67rem;
        background :rgba(75, 170, 249, 1);
        font-size:0.373rem;
        color:#fff;
        text-align :center;
        line-height :0.747rem;
        margin-bottom:0.427rem;
    }
    >.player_des_qu{
        font-size:0.32rem;
        color:rgba(0, 0, 0, 0.4)
    }
   
}
.playerImg_list{
    margin-top:0.32rem;
    display :flex;
    justify-content :space-between;
    flex-wrap:wrap;
    padding:0 0.4rem;
    >li{
        width:4.32rem;
        height:4.59rem;
        margin-bottom:0.4rem;
        background :skyblue;
        >img{
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

}
.vote_wrap{
    width:100%;
    height:100%;
    position :fixed;
    top:0;
    left:0;
    z-index:888;
}
.vote{
    width:100%;
    height:13.52rem;
    background:rgba(0, 0, 0, 0.9);
    position :fixed;
    bottom:0;
    left:0;
    // 助力票
    >.AssistTicket{
        display:flex;
        flex-direction :column;
        align-items :center;
        padding:0 0.4rem;
        >.AssistTicket_title{
            width:100%;
            color:rgba(255, 255, 255, 1);
            line-height :0.613rem;
            margin-bottom:0.213rem;
            display:flex;
            >span{
                 flex:8.5;
                font-size:0.32rem;
            }
            >.AssistTicket_title_first{
                flex:3.5;
                 font-size:0.4rem;
            }
            
        }
        >.AssistTicket_text{
            width:100%;
            font-size:0.32rem;
            color:rgba(196, 207, 232, 1);
            line-height :0.453rem;
        }
        >.SpecialTopicBody_bar{
            width:100%;
            margin-top:0.27rem;
            >ul{
                // height:4.533rem;
                display :flex;
                justify-content:space-between;
                flex-wrap:wrap;
                // align-items :center;
                // overflow-x:scroll;
                // display: -webkit-box;
                // -webkit-box-align: center;
                // align-items :center;
                z-index :-1;
                >li{
                    display:flex;
                    flex-direction:column;
                    margin-bottom:0.32rem;
                    margin-right:0.32rem;
                    >img{
                        width:2.6rem;
                        height:3.2rem;
                    }
                    >span{
                        margin-top:0.27rem;
                        color:rgba(255, 255, 255, 0.8);
                        font-size:0.32rem;
                    }
                }
                >.SpecialTopicBody_barColor{
                    border:0.07rem solid #FF5E4D;
                }
            }
        }
        >.AssistTicket_btn{
            width:3.253rem;
            height:0.853rem;
            background :rgba(255, 157, 172, 1);
            font-size:0.32rem;
            color:rgba(255, 255, 255, 1);
            border-radius:2.67rem;
            text-align :center;
            line-height :0.853rem;
            margin-top:0.32rem;
            margin-bottom:1rem;
        }
    }
    //免费票
    >.FreeTicket{
        display :flex;
        justify-content:space-between;
        align-items :center;
        margin:0.53rem 0.4rem;
        >.FreeTicket_title{
            font-size:0.4rem;
            color:rgba(255, 255, 255, 1);
            line-height :0.613rem;
            >span{
                font-size:0.32rem;
            }
        }
        >.FreeTicket_btn{
            width:2.4rem;
            height:0.64rem;
            background:rgba(255, 157, 172, 1);
            font-size:0.32rem;
            color:rgba(255, 255, 255, 1);
            border-radius:2.67rem;
            text-align :center;
            line-height :0.64rem;
        }
    }
}
// 大图图片列表
.BigplayerImg_list{
    width:100%;
    height:100%;
    position:fixed;
    top:0;
    left:0;
    background:rgba(0,0,0,0.8)
    display:flex;
    align-items:center;
    justify-content:center;
    z-index:999;
        >img{
            width:100%;
            height:auto;
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
// 小轮播
    .small_Carousel{
        width:100%;
        height:1.2rem;
        position :fixed;
        top:1.4rem;
        left:0;
        background :rgba(0, 0, 0, 0.5)
        z-index:777;
        >.small_swiperWrap{
            width:100%;
            height:1.173rem;
             .swiperSlide{
                 display :flex;
                 align-items :center;
                 padding: 0 0.32rem;
                 font-size:0.373rem;
                 color:rgba(255, 255, 255, 1);
                 >img{
                     width:0.64rem;
                     height:0.64rem;
                     border-radius:50%;
                     margin-right:0.16rem;
                 }
                 >span{
                     overflow :hidden;
                     text-overflow :ellipsis;
                     white-space:nowrap;
                     font-size:0.32rem;
                     line-height:0.453rem;
                 }
            }
        }
       
    }
.share_success_wrap{
    width:100%;
    height:100%;
    background:rgba(0,0,0,0.9);
    position:fixed;
    top:0;
    left:0;
    z-index:999;
    .share_success{
        width:8.25rem;
        height:9.6rem;
        position:absolute;
        top:50%;
        left:50%;
        margin-top:-4.8rem;
        margin-left:-4.13rem;
        >.firstEnter_chaimg{
            width:0.493rem;
            height:0.493rem;
            position :absolute;
            top:0.27rem;
            right:0.27rem;
        }
        >img{
            width:8.25rem;
            height:9.6rem;
        }
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
// 视频
.palyerVideo_wrap{
        width:9.2rem;
        height:4.5rem;
        padding:0 0.4rem;
        margin-top:0.32rem;
        position:relative;
    .palyerVideo{
        width:9.2rem;
        height:4.5rem;
        overflow: hidden; border-radius:0.2rem; background :#4e4e4e;
        position:relative;
        >#video1{
            width:100%;
            height:408%;
            border-radius:0.2rem;
            margin-top:-66%;
            
        }
        .zz{ width:9.2rem; height:4.5rem; position:absolute; top:0;left:0; z-index:887; background: url(/../../static/mock/img/bofangBtn.png) no-repeat center center; background-size:1rem;}
    }
}

</style>

