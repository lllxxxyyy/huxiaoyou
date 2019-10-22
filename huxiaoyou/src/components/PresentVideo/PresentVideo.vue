<!--  -->
<template>
  <div class="PresentVideo">
       <div class="PlayerRanking_header">
          <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
          <span>介绍视频</span>
		  <div @click="delStatus()" class="PresentPhoto_admin">管理</div>
      </div>
      <ul class="videoList">
          <li v-for="(item,index) in reply" :key="index" >
            <video id="video1" >
              <source :src="item.video_introduction" type="video/mp4"  @click="goGoodsPage"/>
            </video>
			<div class="zz"></div>
            <div v-if="!!delFlag" @click="delVideo(item.video_introduction)" class="gxuan">删除</div>
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
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
    name:'PresentVideo',
  data () {
    return {
        delFlag: false,

        formData:new FormData(),
        imgs: {},
        imgLen:0,
        fil:'',
        videoDataList:'',
        playerOptions:[],
        reply: '',
      currentPlayerData: {},

        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
    };
  },
  components: {

  },
  computed:{
        ...mapState(['staticImgH','tokenH']),
    },
  mounted(){
       this.videoData()
    // this.get()
  },
  methods: {
      delStatus(){
        this.delFlag=!this.delFlag
      },
    goGoodsPage(player){
      this.$router.push({path: '/PlayerStyleDetailed', query: {player: player}})
    },
      addVideo(){
        this.uploadFile();
      },
    delVideo(src){
      // @TODO 个人视频删除，感觉接口调用的不对
      this.$http.delete('api/player/video_del', {
        headers: {
          'authorization': this.tokenH
        },
        params: {
          src: src,
          type: 2
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.reply = this.reply.filter(value => value.video_introduction!==src)
          this.alertText("视频删除成功")
        }
      })
    },
    // get(){
    //     debugger
    //   for (let i = 0; i<this.reply.length; i++) {
    //     let video = document.getElementById('video'+i);
    //     let videoImg = document.getElementById('videoImg'+i);
    //     this.captureImage(video, videoImg)
    //   }
    // },
    // captureImage(video, videoImg) {
    //   let canvas = document.createElement("canvas");//创建一个canvas
    //   canvas.width = 100 * scale;//设置canvas的宽度为视频的宽度
    //   canvas.height = 100 * scale;//设置canvas的高度为视频的高度
    //   canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);//绘制图像
    //
    //   let img = document.createElement("img");//创建img
    //   img.src = canvas.toDataURL("image/png");//将绘制的图像用img显示出来
    //   videoImg.appendChild(img);//将img添加到imgbox里
    // },
      videoData(){
           var obj=qs.stringify({

            })
            this.$http.post('/api/user/info',obj,{
                headers: {
                    'authorization':this.tokenH
                }
            }).then((res)=>{
                if(res.data.code==200){
                  this.currentPlayerData=res.data.data
                    this.reply=res.data.data.video_introduction
                    if(this.reply){
                        for(let i of this.reply){
                                let arrStr={
                                    playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
                                    muted: false, // 默认情况下将会消除任何音频。
                                    language: 'zh-CN',
                                    sources: [{
                                            src: i.video_introduction,  // 路径
                                            type: 'video/mp4'  // 类型
                                            }, {
                                            src: i.video_introduction,
                                            type: 'video/mp4'
                                        }],
                                  height: 150
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
          alert('最多可上传4个，您还可以上传'+(4-oldLen)+'个');
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
              debugger
                if(res.data.code==200){
                  debugger
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
        margin-bottom:0.32rem;
        >video{
            width:100%;
            height:4rem;
        }
    }
}
.videoList>>>.video-player {
    width:100%;
    >.video-js{
        width:100%;
		border-radius:0.2rem;
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
        padding:0.15rem 0.3rem;
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
.gxuan{ margin-top:-0.99rem; width:9.2rem; height:0.9rem; background:rgba(0,0,0,0.5); position:absolute; z-index:999; color:#fff; text-align:center; line-height:0.9rem; font-size:0.48rem; border-radius:0 0 0.2rem 0.2rem;}
.zz{ width:9.2rem; height:4rem; position:absolute; margin-top:-4rem; z-index:998; background: url(/../../static/mock/img/bofangBtn.png) no-repeat center center; background-size:1rem;}
</style>
