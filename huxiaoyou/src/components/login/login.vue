<!-- 首页 -->
<template>
  <div class="login">
        登陆中。。。
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


      // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
    };
  },
  computed:{
        ...mapState(['WpersonInfoH'])
    },
  mounted() {
    // 判断本地有没有用户信息
    if(this.WpersonInfoH.unionid && this.WpersonInfoH.miniapp && this.WpersonInfoH.nickname && this.WpersonInfoH.head_pic && this.WpersonInfoH.sex){
        this.unionid=this.WpersonInfoH.unionid
        this.miniapp=this.WpersonInfoH.miniapp
        this.nickname=this.WpersonInfoH.nickname
        this.head_pic=this.WpersonInfoH.head_pic
        this.sex=this.WpersonInfoH.sex
        this.Islogin()  //走登录
    }else{  //否则重新获取code值
        this.getCodes ()  
    }
    
  },
  methods: {
    // 登录接口
      Islogin(){
        var LoginObj=qs.stringify({
          unionid:this.unionid,
          miniapp:this.miniapp,
          nickname:this.nickname,
          head_pic:this.head_pic,
          sex:this.sex
        })
        this.$http.post('api/user/logins',LoginObj).then((res)=>{
          if(res.data.code==200){
            this.userIdHs(res.data.data.result.user_id)
            this.tokenHs(res.data.data.result.token)  //token
            if(!!this.$route.query.redirect){
                this.$router.push(this.$route.query.redirect)//这里是拦截前想跳转的页面
            }else{
                this.$router.push('/')//这里填你默认跳转的地址
                
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
              this.getCodes ()  //code!==200重新获取code
          }
        })
      },
     //获取code值
      getUrlParam(name) {//封装方法
          var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
          var r = window.location.search.substr(1).match(reg); //匹配目标参数
          if (r != null) return unescape(r[2]);
          return null; //返回参数值
      },
    // 获取微信用户
      getCodes () {
          const AppId='wx7cb8b9da4ff3bac2';
          const code=this.getUrlParam('code')
          const local=window.location.href
          if(code==null || code===''){
            window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+AppId+'&redirect_uri='+encodeURIComponent(local)+'&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
          }else{
             var obj=qs.stringify({
               code:code
             })
              this.$http.post('/api/user/user_login',obj).then((res)=>{
                  if(res.data.code==200){
                      var data=res.data.data
                      let personInfo={unionid:data.unionid,miniapp:data.openid,nickname:data.nickname,head_pic:data.headimgurl,sex:data.sex}
                      this.WpersonInfoHs(personInfo)
                      this.unionid=data.unionid
                      this.miniapp=data.openid
                      this.nickname=data.nickname
                      this.head_pic=data.headimgurl
                      this.sex=data.sex
                      this.Islogin()  
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
          }
      },
      ...mapMutations(['WpersonInfoHs','tokenHs','userIdHs']),
  }
}

</script>
<style scoped lang="stylus">
</style>