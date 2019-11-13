<!--  -->
<template>
  <div class="PresentVideo">
    <div class="PlayerRanking_header">
      <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
      <span>介绍视频</span>
      <div @click="delStatus()" class="PresentPhoto_admin">管理</div>
    </div>
    <ul class="videoList">
      <li v-for="(item,index) in reply" :key="index">
        <div class="present_video">
		<video id="video1">
          <source :src="item.video_introduction" type="video/mp4">
        </video>
		</div>
        <div class="zz" @click.stop="goGoodsPage(item.v_id)"></div>
        <div v-if="delFlag" @click="delVideo(item.video_introduction, item.v_id)" class="gxuan">删除</div>
      </li>
    </ul>

    <div class="right_wrap">
      <div class="right">
        添加视频<span><img :src="staticImgH+'tianjia.png'" alt=""></span>
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
        imgs: {},
        imgLen: 0,
        fil: '',
        
        reply: [],  //视频列表数据
        currentPlayerData:{},  //获取个人信息数据
        delFlag: false,    //视频列表删除按钮默认不显示

        // 提示盒子
        promptContent: '', //提示盒子的内容
        showPrompt: false,//提示盒子的吸收和显示
        timer2:'',

        lodingShow:false, //加载状态默认不显示

        audioElement:'',

      };
    },
    computed: {
      ...mapState(['staticImgH']),
    },
    mounted() {
      this.videoData()
      //获取个人信息
      this.$http.post('/api/user/info').then((res) => {
        if (res.data.code === 200) {
          this.currentPlayerData = res.data.data
        } else {
          this.toastMsg(res.data.msg)
        }
      })
    },
    methods: {
      // 跳视频详情页
          goGoodsPage(v_id) {
            let player = {
              id: this.currentPlayerData.player_id,
              v_id: v_id
            }
            this.playerVideoPages('/PresentVideo')   //设置选手视频返回页面
            this.PlayerStyleDetailedPlayer(player);  //给选手视频页面传player
            this.$router.push('/PlayerStyleDetailed')
          },
      // 点击管理
          delStatus() {
            this.delFlag = !this.delFlag
          },
      // 点击删除
          delVideo(src, id) {
            this.lodingShow=true
            // @TODO 个人视频删除，感觉接口调用的不对
            this.$http.delete('api/player/video_del', {
              params: {
                src: src,
                type: 1,
                v_id: id
              }
            }).then((res) => {
              if (res.data.code === 200) {
                this.lodingShow=false
                this.$refs.inputer.val=''
                this.imgLen--
                this.videoData();
                this.toastMsg("视频删除成功")
              }else{
                this.lodingShow=false
              }
            })
          },
      // 上传视频
          uploadFile(){
              this.lodingShow=true
              this.delFlag=false
              let inputDOM = this.$refs.inputer;
              // 通过DOM取文件数据
              this.fil = inputDOM.files;

              var url = URL.createObjectURL(this.fil[0]);
              //经测试，发现audio也可获取视频的时长
              this.audioElement = new Audio(url);
              
              this.audioElement.addEventListener("loadedmetadata", this.uploadFileTwo);
          },
          uploadFileTwo(){
              var duration;
              duration = this.audioElement.duration;
              let oldLen = this.imgLen;
              let len = this.fil.length + oldLen;
              if(duration>15){
                  this.lodingShow=false
                  this.toastMsg('上传的视频不能超过15秒')
                  return
              }else if(len > 2){
                  this.lodingShow=false
                  this.toastMsg('每天最多可上传2个，您还可以上传' + (2 - oldLen) + '个')
                  return 
              }else{
                  for (let i = 0; i < this.fil.length; i++) {
                      let size = Math.floor(this.fil[i].size / 1024);
                      if (size > 10 * 1024 * 1024) {
                        this.lodingShow=false
                        this.toastMsg('请选择5M以内的视频！')
                        return
                      }
                      this.imgLen++;
                      this.formData.delete('video_introduction');
                      this.formData.delete('type');
                      this.formData.append('video_introduction', this.fil[i])
                      this.formData.append('type', 1)
                  }
                  this.$http.post('api/player/video_introduction', this.formData).then(res => {
                    // debugger
                      this.$refs.inputer.value=''
                      if(res.data.code==200){
                          this.lodingShow=true
                          this.videoData()
                      }else{
                          this.lodingShow=false
                          this.imgLen--
                          this.toastMsg(res.data.msg)
                      }
                  });
              }
          },
      // 获取视频数据
          videoData() {
            this.$http.post('/api/player/user_video').then((res) => {
              if (res.data.code === 200) {
                this.lodingShow=false
                this.reply = res.data.data.result
              } else {
                this.lodingShow=false
                this.toastMsg(res.data.msg)
                return false;
              }

            })
          },
      // 返回
          toReturn() {
            this.$router.push('/Mine')
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
      ...mapMutations(['PlayerStyleDetailedPlayer','playerVideoPages']),

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
	min-height:14.6rem;
    padding:0 0.4rem;
    margin-top:0.27rem;
    >li{
        width:9.2rem;
		height:4rem;
        margin-bottom:0.32rem;
		>.present_video{width:9.2rem; height:4rem; overflow: hidden; border-radius:0.2rem; background :#4e4e4e;
        >video{
            width:100%;
            height:408%;
            border-radius:0.2rem;
			margin-top:-66%;
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
