<!--  -->
<template>
  <div class="PresentVideo">
    <div class="PlayerRanking_header">
      <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
      <span>我的视频</span>
      <div class="PresentPhoto_admin"></div>
    </div>
    <ul class="videoList" v-if="this.videoSrc">
      <li>
        <div class="present_video">
		<video v-if="this.videoSrc" ref="video1" id="video1" :poster="this.videoSrc+'?x-oss-process=video/snapshot,t_10000,m_fast'">
            <source :src="this.videoSrc" type="video/mp4">
        </video>
		</div>
        <div class="zz" @click.stop="goGoodsPage()"></div>
      </li>
    </ul>
    <div class="video_text" v-if="this.videoSrc">此视频展示在选手详情页面</div>
    <div class="right_wrap">
      <div class="right">
        修改视频<span><img :src="staticImgH+'tianjia.png'" alt=""></span>
        <input type="file" class="upload" @change="uploadFile" ref="inputer" accept="video/*"/>
      </div>
    </div>
    <!-- 提示盒子 -->
    <transition name="fade">
      <div class="promptFather" v-if="showPrompt">
        <div class="prompt">
          {{promptContent}}
        </div>
      </div>
    </transition>
    <!-- loding -->
      <div class="login_wrap" v-if="lodingShow">
         <div class="loginImg">
           <img :src="staticImgH+'jiazai.gif'" alt="">
         </div>
      </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import {mapMutations} from 'vuex'
  import qs from 'qs'

  export default {
    name: 'PresentVideo',
    data() {
      return {
        formData: new FormData(),   //上传图片
        fil: '',
        
        currentPlayerData:{},  //获取个人信息数据

        // 提示盒子
        promptContent: '', //提示盒子的内容
        showPrompt: false,//提示盒子的吸收和显示
        timer2:'',

        lodingShow:false, //加载状态默认不显示

        videoSrc:'',

      };
    },
    computed: {
      ...mapState(['staticImgH']),
    },
    mounted() {
        this.getUserInfo()
    },
    methods: {
        // 调用户信息
        getUserInfo(){
            //获取个人信息
            this.$http.post('/api/user/info').then((res) => {
                this.lodingShow=false
                if (res.data.code === 200) {
                    this.videoSrc= res.data.data.user_introduction[0].src
                } else {
                    this.toastMsg(res.data.msg)
                }
            })
        },
      // 跳视频详情页
        goGoodsPage() {
                this.$router.push({path:'/videoDetail',query:{videoSrc:this.videoSrc}})
          },
      // 上传视频
          uploadFile(){
              this.lodingShow=true
              let inputDOM = this.$refs.inputer;
              // 通过DOM取文件数据
              this.fil = inputDOM.files;
              this.uploadFileTwo()
          },
          uploadFileTwo(){
              if(this.fil.length >= 2){
                    this.$refs.inputer.value=''
                    this.lodingShow=false
                    this.toastMsg('只能上传一个视频')
                    return 
              }else if(this.fil[0].size > 10*1024*1024){
                    this.$refs.inputer.value=''
                    this.lodingShow=false
                    this.toastMsg('您选择的视频超过限制')
                    return
              }else{
                    this.formData.delete('video_introduction');
                    this.formData.delete('type');
                    this.formData.append('video_introduction', this.fil[0])
                    this.formData.append('type', 2)
                    this.$http.post('api/player/video_introduction', this.formData).then(res => {
                        // debugger
                        this.$refs.inputer.value=''
                        if(res.data.code==200){
                            this.getUserInfo()
                        }else{
                            this.lodingShow=false
                            this.toastMsg(res.data.msg)
                        }
                    });
              }
          },
      // 返回
          toReturn() {
            this.$router.push('/MineInformation')
          },
      // 弹框提示
          toastMsg(msg) {
              let self = this
              clearInterval(self.timer2);
              this.promptContent = msg
              this.showPrompt = true
              self.timer2 = setTimeout(function () {
                self.showPrompt = false
                clearInterval(self.timer2);
              }, 2000)
          },
      ...mapMutations([]),

    }
  }

</script>
<style scoped lang="stylus">
.PlayerRanking_header{
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
    }
	>.PresentPhoto_admin{ font-size:0.42rem;}
}
.right_wrap{
  width:100%;
  background :rgba(0,0,0,0.1);
  display :flex;
  align-items :center;
  justify-content :center;
  padding:0.3rem 0;
  position :fixed;
  bottom:0;
  left:0;
}
.right{
    position :relative;
    display:flex;
    align-items :center;
    font-size:0.4rem;
        >span{
          margin-left:0.32rem;
            color:rgba(0, 0, 0, 1);
            >img{ 
              width:0.8rem;
            }
        }
        >input{
            width:100%;
			      height:0.8rem;
            opacity :0;
            position :absolute;
            top:0;
            left:0;
            z-index:999;
        }
    }
.videoList{
    width:100%;
    padding:0 0.4rem;
    margin-top:0.27rem;
    >li{
        width:9.2rem;
		height:4rem;
        margin-bottom:0.32rem;
		>.present_video{
            width:9.2rem; height:4rem; overflow: hidden; border-radius:0.2rem; background :#4e4e4e;
            >video{
                width:100%;
                height:408%;
                border-radius:0.2rem;
                margin-top:-66%;
            }
		}
    }
}
.video_text{
    font-size:0.48rem;
    color:#FF9DAC;
    padding:0 0.45rem;
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
        padding:0.15rem 0.3rem;
        background :rgba(0,0,0,0.7);
        color:#fff;
        border-radius:0.5rem;
        font-size:0.32rem;
    }
}
.login_wrap{
  width:100%;
  height:100%;
  background:rgba(0,0,0,0.9);
  position:fixed;
  top:0;
  left:0;
  z-index:999;
  .loginImg{
    width:1.28rem;
    height:1.28rem;
    position:absolute;
    top:0;
    bottom:0;
    left:0;
    right:0;
    margin:auto;
    >img{
      width:100%;
      height:100%;
    }
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
.gxuan{ margin-top:-0.9rem; width:9.2rem; height:0.9rem; background:rgba(0,0,0,0.5); position:absolute; z-index:999; color:#fff; text-align:center; line-height:0.9rem; font-size:0.48rem; border-radius:0 0 0.2rem 0.2rem;}
.zz{ width:9.2rem; height:4rem; position:absolute; margin-top:-4rem; z-index:998; background: url(/../../static/mock/img/bofangBtn.png) no-repeat center center; background-size:1rem;}
</style>
