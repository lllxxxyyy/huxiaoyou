<!--  -->
<template>
  <div class="PresentVideo">
       <div class="PlayerRanking_header">
          <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
          <span>介绍视频</span>
          <div class="right">
              <span @click="addVideo">添加</span>
              <input type="file" class="upload" @change="uploadFile" ref="inputer" accept="video/*"/>
          </div>
      </div>
      <ul class="videoList">
          <li v-for="(item,index) in reply" :key="index">
              <video-player
                class="video-player-box ovideo"
                ref="videoPlayer"
                :options="playerOptions[index]"
                :playsinline="true">
            </video-player>
          </li>
      </ul>
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
        ...mapState(['staticImgH','tokenH'])
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
                if(res.data.code==200){
                    this.reply=res.data.data.video_introduction
                    if(this.reply){
                        for(let i of this.reply){
                                let arrStr={
                                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                                    muted: false, // 默认情况下将会消除任何音频。
                                    language: 'zh-CN',
                                    sources: [{
                                            src: i.src,  // 路径
                                            type: 'video/mp4'  // 类型
                                            }, {
                                            src: i.src,
                                            type: 'video/mp4'
                                        }],
                                }
                                this.playerOptions.push(arrStr)
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
           this.formData.append('video_introduction[]',this.fil[i])
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
    .right{
        position :relative;
        >span{
            font-size:0.4rem;
            color:rgba(0, 0, 0, 1);
        }
        >input{
            width:0.8rem;
            opacity :0;
            position :absolute;
            top:0;
            left:0;
            z-index:999;
        }
    }
}
.videoList{
    width:100%;
    padding:0 0.4rem;
    margin-top:0.27rem;
    >li{
        width:9.2rem;
        background :pink;
        margin-bottom:0.32rem;
        >video{
            width:100%;
            // height:100%;
        }
    }
}
.videoList>>>.video-player {
    width:100%;
    >.video-js{
        width:100%;
    }
}
// video-js vjs-paused vjs-controls-enabled vjs-v6 vjs-user-active vjs_video_1267-dimensions
.video-js {
    >>>.vjs-big-play-button{
        width:0.85rem!important;
        height:0.85rem!important;
        border-radius:50%!important;
        color:red;
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
</style>