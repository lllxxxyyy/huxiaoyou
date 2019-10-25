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
        <video id="video1">
          <source :src="item.video_introduction" type="video/mp4">
        </video>
        <div class="zz" @click.stop="goGoodsPage(item.v_id)"></div>
        <div v-if="delFlag" @click="delVideo(item.video_introduction, item.v_id)" class="gxuan">删除</div>
      </li>
    </ul>


    <div class="right">
      <span><img :src="staticImgH+'tianjia.png'" alt=""></span>
      <input type="file" class="upload" @change="uploadFile" ref="inputer" accept="video/*"/>
    </div>
    <!-- 提示盒子 -->
    <transition name="fade">
      <div class="promptFather" v-if="showPrompt">
        <div class="prompt">
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
            // @TODO 个人视频删除，感觉接口调用的不对
            this.$http.delete('api/player/video_del', {
              params: {
                src: src,
                type: 1,
                v_id: id
              }
            }).then((res) => {
              if (res.data.code === 200) {
                this.reply = this.reply.filter(value => value.video_introduction !== src)
                this.toastMsg("视频删除成功")
              }
            })
          },
      // 上传视频
          uploadFile() {
              this.delFlag=false
              let inputDOM = this.$refs.inputer;
              // 通过DOM取文件数据
              this.fil = inputDOM.files;
              let oldLen = this.imgLen;
              let len = this.fil.length + oldLen;
              if (len > 2) {
                this.toastMsg('每天最多可上传2个，您还可以上传' + (2 - oldLen) + '个')
                return false;
              }
              for (let i = 0; i < this.fil.length; i++) {
                let size = Math.floor(this.fil[i].size / 1024);
                if (size > 10 * 1024 * 1024) {
                  this.toastMsg('请选择5M以内的视频！')
                  return false
                }
                this.imgLen++;
                this.formData.append('video_introduction', this.fil[i])
                this.formData.append('type', 1)
              }
              this.$http.post('api/player/video_introduction', this.formData).then(res => {
                // debugger
                this.$refs.inputer.value=''
                  if(res.data.code==200){
                      this.videoData()
                      
                  }else{
                      this.toastMsg(res.data.msg)
                  }
              });

          },
      // 获取视频数据
          videoData() {
            this.$http.post('/api/player/user_video').then((res) => {
              if (res.data.code === 200) {
                this.reply = res.data.data.result
              } else {
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
        background :#4e4e4e;
        border-radius:0.2rem;
        >video{
            width:100%;
            height:4rem;
            border-radius:0.2rem;
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
