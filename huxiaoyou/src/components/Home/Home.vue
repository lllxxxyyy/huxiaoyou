<!-- 首页 -->
<template>
  <div class="home">
      <!-- <HomeHeader/>  -->
      <!-- <HomeAngel/> -->
      <HomeBanner/>
      <SmallSwiper/>
      <HomeZone/>
      <wonderfulVideo/>
      <Foot class="PublicFoot" />  <!-- 公共底部 -->
      <div class="footer">
      </div>
      <!-- 判断是否第一次进入app    是（弹）提示去报名-->
      <div class="firstEnter_wrap" v-if="ShowFirstEnter">
          <div class="firstEnter">
            <div class="firstEnter_img">
                <img @click="hideFirstEnter"  class="firstEnter_chaimg" :src="staticImgH+'cha.png'" alt="">
                <img class="firstEnter_desimg" :src="staticImgH+'firstEnter.png'" alt="">
            </div>
              
              <div class="firstEnter_btn" @click="toSignUp"> 去报名</div>
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
import Foot from './../Foot/Foot'

import HomeBanner from '././page/banner'
import SmallSwiper from '././page/SmallSwiper'
import HomeZone from '././page/HomeZone'
import wonderfulVideo from '././page/wonderfulVideo'   //精彩视频

// import HomeHeader from '././page/header'
// import HomeAngel from '././page/HomeAngel'


import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
  data () {
    return {
      unionid:'',  
      miniapp:'',
      nickname:'',
      head_pic:'',
      sex:'',

      ShowFirstEnter:false,//默认让判断'是否第一次进入去报名的提示'消失

      // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
    };
  },
  components: {
      Foot,
      HomeBanner,
      SmallSwiper,
      HomeZone,
      wonderfulVideo,

    //   HomeHeader,
    //   HomeAngel,
      
  },
  computed:{
        ...mapState(['staticImgH','WpersonInfoH','userIdH','apiH'])
    },
  mounted() {
      this.WShare()
    // 判断本地有没有用户信息
    // if(this.WpersonInfoH.unionid && this.WpersonInfoH.miniapp && this.WpersonInfoH.nickname && this.WpersonInfoH.head_pic && this.WpersonInfoH.sex){
    //     this.unionid=this.WpersonInfoH.unionid
    //     this.miniapp=this.WpersonInfoH.miniapp
    //     this.nickname=this.WpersonInfoH.nickname
    //     this.head_pic=this.WpersonInfoH.head_pic
    //     this.sex=this.WpersonInfoH.sex
    //     this.Islogin()  //走登录
    // }else{  //否则重新获取code值
    //     this.getCodes ()  
    // }
    
  },
  methods: {
    // 隐藏‘第一次进入提示’弹框
    hideFirstEnter(){
        this.ShowFirstEnter=false
    },
    // 去报名
      toSignUp(){
        this.$router.push('/SignUp')
      },
      // 微信分享
            WShare(){
                var Wobj=qs.stringify({
                    player_id:this.userIdH,
                    type:4,
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
        //   分享给朋友
            toFriend(){
                var vm=this
                var realLocation=vm.apiH+'/#/'
                wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                    wx.onMenuShareAppMessage({ 
                        title:'快来围观天使旅行家大赛，领略美食、美景、美女！', // 分享标题
                        desc:'狐小游 ', // 分享描述
                        link:vm.apiH+'/static/html/redirect.html?app3Redirect='+encodeURIComponent(realLocation), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                        imgUrl: '../../static/mock/imgcusKefu.jpg', // 分享图标
                        success: function (res) {
                        }
                    })
                });
            },
        //   分享到朋友圈
            toFriendQuan(){
                    var vm=this
                    var realLocation=vm.apiH+'/#/'
                    wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
                        wx.onMenuShareTimeline({
                                title:'快来围观天使旅行家大赛，领略美食、美景、美女！', // 分享标题
                                link: vm.apiH+'/static/html/redirect.html?app3Redirect='+encodeURIComponent(realLocation),  // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                                imgUrl:vm.staticImgH+'cusKefu.jpg', // 分享图标
                                success: function (res) {
                                },
                        })
                });
            },
    // 登录接口
    //   Islogin(){
    //     var LoginObj=qs.stringify({
    //       unionid:this.unionid,
    //       miniapp:this.miniapp,
    //       nickname:this.nickname,
    //       head_pic:this.head_pic,
    //       sex:this.sex
    //     })
    //     this.$http.post('api/user/logins',LoginObj).then((res)=>{
    //       if(res.data.code==200){
    //         this.tokenHs(res.data.data.result.token)  //token
    //         if(!!this.$route.query.redirect){
    //             this.$router.push(this.$route.query.redirect)//这里是拦截前想跳转的页面
    //         }else{
    //             // this.$router.push('/')//这里填你默认跳转的地址
    //             if(res.data.data.result.is_tan==1){
    //                 this.ShowFirstEnter=true
    //             }else{
    //                 this.ShowFirstEnter=false
    //             }
    //         }
            
    //       }else{
    //         var self=this
    //         clearInterval(self.timer2);
    //                 this.promptContent=res.data.msg
    //                 this.showPrompt=true
    //                 self.timer2=setTimeout(function(){
    //                     self.showPrompt=false
    //                     clearInterval(self.timer2);
    //                 },2000)
    //             return false;
    //           this.getCodes ()  //code!==200重新获取code
    //       }
    //     })
    //   },
     //获取code值
    //   getUrlParam(name) {//封装方法
    //       var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    //       var r = window.location.search.substr(1).match(reg); //匹配目标参数
    //       if (r != null) return unescape(r[2]);
    //       return null; //返回参数值
    //   },
    // 获取微信用户
    //   getCodes () {
    //       const AppId='wx7cb8b9da4ff3bac2';
    //       const code=this.getUrlParam('code')
    //       const local=window.location.href
    //       if(code==null || code===''){
    //         window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppId+'&redirect_uri='+encodeURIComponent(local)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    //       }else{
    //          var obj=qs.stringify({
    //            code:code
    //          })
    //           this.$http.post('/api/user/user_login',obj).then((res)=>{
    //               if(res.data.code==200){
    //                   var data=res.data.data
    //                   let personInfo={unionid:data.unionid,miniapp:data.openid,nickname:data.nickname,head_pic:data.headimgurl,sex:data.sex}
    //                   this.WpersonInfoHs(personInfo)
    //                   this.unionid=data.unionid
    //                   this.miniapp=data.openid
    //                   this.nickname=data.nickname
    //                   this.head_pic=data.headimgurl
    //                   this.sex=data.sex
    //                   this.Islogin()  
    //               }else{
    //                  var self=this
    //                 clearInterval(self.timer2);
    //                         this.promptContent=res.data.msg
    //                         this.showPrompt=true
    //                         self.timer2=setTimeout(function(){
    //                             self.showPrompt=false
    //                             clearInterval(self.timer2);
    //                         },2000)
    //                     return false;
    //               }
    //           })
    //       }
    //   },
      ...mapMutations(['WpersonInfoHs','tokenHs']),
  }
}

</script>
<style scoped lang="stylus">
.home{
  background :#fff;
}
.PublicFoot{
    position :fixed;
    bottom:0;
    left:0;
}
.footer{
   width:100%;
   height:1.458rem;
   background :#fff;
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
        font-size:0.34rem;
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

//
.firstEnter_wrap{
  width:100%;
  height:100%;
  position :fixed;
  top:0;
  left:0;
  background :rgba(0,0,0,0.9);
  z-index:999;
  >.firstEnter{
    width:8.27rem;
    height:13rem;
    position :absolute;
    top:0;
    left:0;
    bottom:0;
    right:0;
    margin:auto;
    >.firstEnter_img{
        width:8.27rem;
        height:11.59rem;
        position :relative;
        >.firstEnter_chaimg{
            width:0.493rem;
            height:0.493rem;
            position :absolute;
            top:0.27rem;
            right:0.27rem;
        }
        >.firstEnter_desimg{
            width:8.27rem;
            height:11.59rem;
        }
    }
    
    >.firstEnter_btn{
      width:8.27rem;
      height:0.8rem;
      border-radius:0.667rem;
      margin-top:0.48rem;
      background :rgba(255, 157, 172, 1);
      color:#fff;
      font-size:0.347rem;
      text-align :center;
      line-height :0.8rem;
    }
  }
}
</style>