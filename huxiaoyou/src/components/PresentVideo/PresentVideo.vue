<!--  -->
<template>
  <div class="PresentVideo">
       <div class="PlayerRanking_header">
          <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
          <span>添加视频</span>
		  <div class="PresentPhoto_admin">管理</div>
      </div>
      <ul class="videoList">
          <li v-for="(item,index) in reply" :key="index">
              <video-player
                class="video-player vjs-custom-skin"
                ref="videoPlayer"
                :options="playerOptions[index]"
                :playsinline="true"
                @play="onPlayerPlay($event)"
                @pause="onPlayerPause($event)"
                >
            </video-player><div class="gxuan">删除</div>
          </li>
      </ul>
	  <div class="right">
         <span @click="addVideo"><img :src="staticImgH+'tianjia.png'" alt=""></span>
         <input type="file" class="upload" @change="uploadFile" ref="inputer" accept="video/*"/>
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
import { videoPlayer } from 'vue-video-player'
import 'video.js/dist/video-js.css'
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
    name:'PresentVideo',
  data () {
    return {
        formData:new FormData(),
        imgs: {},
        imgLen:0,
        fil:'',
        videoDataList:'',
        playerOptions:[],
        reply: '',

        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
    };
  },
  components: {
      videoPlayer
  },
  computed:{
        ...mapState(['staticImgH','tokenH']),
        player() {
            return this.$refs.videoPlayer.player
        }
    },
  mounted(){
       this.videoData()
  },
  methods: {
      addVideo(){
      },
      videoData(){
           var obj=qs.stringify({

            })
            this.$http.post('/api/user/info',obj,{
                headers: {
                    'authorization':this.tokenH
                }
            }).then((res)=>{
                 var self=this
                if(res.data.code==200){
                    self.reply=res.data.data.video_introduction
                    if(self.reply){
                        
                        for(let i of self.reply){
                                let arrStr={
                                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                                    // autoplay: false, //如果true,浏览器准备好时开始回放。
                                    muted: false, // 默认情况下将会消除任何音频。
                                    // loop: false, // 导致视频一结束就重新开始。
                                    // preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
                                    language: 'zh-CN',
                                    aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
                                    fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
                                    sources: [{
                                        type: "video/ogg",
                                        type:"video/webm",
                                        type: "video/mp4",
                                        src: i.video_introduction,
                                    }],
                                    poster: "你的封面地址",
                                    width: document.documentElement.clientWidth,
                                    notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
                                    controlBar: {
                                        // timeDivider: true,
                                        // durationDisplay: true,
                                        // remainingTimeDisplay: false,
                                        fullscreenToggle: true  //全屏按钮
                                    }
                                }
                                self.playerOptions.push(arrStr)
                        }
                    }else{
                        var self=this
                        clearInterval(self.timer2);
                                this.promptContent='没有视频'
                                this.showPrompt=true
                                self.timer2=setTimeout(function(){
                                    self.showPrompt=false
                                    clearInterval(self.timer2);
                                },2000)
                            return false;
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
      },
      fullScreen() {
        const player = this.$refs.videoPlayer.player
        player.requestFullscreen()//调用全屏api方法
        player.isFullscreen(true)
        player.play()
      },
      onPlayerPlay(player) {
        player.play()
      },
      onPlayerPause(player) {
        // alert("pause");
        player.pause()
      },
      toReturn(){
          this.$router.push('/Mine')
      },
      uploadFile(){
        let inputDOM = this.$refs.inputer;
        // 通过DOM取文件数据
        this.fil = inputDOM.files;
        let oldLen=this.imgLen;
        let len=this.fil.length+oldLen;
        if(len>4){
          alert('最多可上传4张，您还可以上传'+(4-oldLen)+'张');
          return false;
        }
        
        for (let i=0; i < this.fil.length; i++) {
          let size = Math.floor(this.fil[i].size / 1024);
          if (size > 5*1024*1024) {
            alert('请选择5M以内的视频！');
            return false
          }
          this.imgLen++;
           this.formData.append('video_introduction',this.fil[i])
        }
        
        this.$http.post('api/player/video_introduction', this.formData,{
            headers: {
                    'authorization': this.tokenH
                }
            }).then(res => {
                if(res.data.code==200){
                     var self=this
                    clearInterval(self.timer2);
                            this.promptContent='成功添加视频'
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
            });
       
      },
    //    getObjectURL(file) {
    //     var url = null ;
    //     if (window.createObjectURL!=undefined) { // basic
    //       url = window.createObjectURL(file) ;
    //     } else if (window.URL!=undefined) { // mozilla(firefox)
    //       url = window.URL.createObjectURL(file) ;
    //     } else if (window.webkitURL!=undefined) { // webkit or chrome
    //       url = window.webkitURL.createObjectURL(file) ;
    //     }
    //     return url ;
    //   },
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
.right{
        position :relative;
		width:0.8rem;
		margin-top:0.3rem;
		margin-bottom:0.3rem;
		left:4.6rem;
        >span{
            font-size:0.4rem;
            color:rgba(0, 0, 0, 1);
			>img{ width:0.8rem;}
        }
        >input{
            width:0.8rem;
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
	min-height:14.6rem;
    padding:0 0.4rem;
    margin-top:0.27rem;
    >li{
        width:9.2rem;
        height:4.533rem;
        background :pink;
        margin-bottom:0.32rem;
        >.video-player {
                width:9.2rem;
                height:4.533rem;
                >>>.video-js{
                    width:9.2rem;
                    height:4.533rem;
                    border-radius:0.2rem;
                    position :relative;
                    video{
                        width:100%;
                        height:100%;
                    }
                    .vjs-big-play-button {
                        width: 0.893rem;
                        height: 0.893rem;
                        border-radius: 50%;
                        z-index: 100;
                        border: solid 0.03rem #979797;
                        text-align :center;
                        line-height:0.893rem;
                        position :absolute;
                        top:50%;
                        left:50%;
                        margin-top:-0.45rem;
                        margin-left:-0.45rem;

                    }
                }
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
.gxuan{ margin-top:-0.9rem; height:0.9rem; background:rgba(0,0,0,0.5); position:relative; width:100%; color:#fff; text-align:center; line-height:0.9rem; font-size:0.48rem; border-radius:0 0 0.2rem 0.2rem;}
</style>