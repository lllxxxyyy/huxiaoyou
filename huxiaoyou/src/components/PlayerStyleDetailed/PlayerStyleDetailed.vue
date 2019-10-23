<!--  -->
<template>
  <div class="PlayerStyle">
    <div class="PlayerRanking_header">
      <img @click="toReturn" :src="staticImgH+'zuojiantoub.png'" alt="">
    </div>
    <div class="player_top">
      <div class="player_name">
        <img v-if="currentPlayerData" :src="currentPlayerData.avatar" alt="">
        <span>{{currentPlayerData.username}}</span>

        <span class="guanzhu" v-if="!video_info.concern" @click="follow()">关注</span>
        <span class="guanzhu" v-if="video_info.concern" @click="follow()">已关注</span>
      </div>
    </div>
    <div class="player_paiming">{{currentPlayerData.names}}排名：{{video_info.rank}}名</div>
    <div class="video">
      <!--<video controls="controls" autoplay="autoplay" src="https://www.w3school.com.cn/i/movie.ogg"></video>-->
      <!--<video controls="controls" autoplay="autoplay" :src="currentPlayerData.video_introduction"></video>-->
      <!--<video-player class="video-player-box ovideo" controls="controls" autoplay="autoplay" ref="videoPlayer" :options="playerOptions" :playsinline="true">-->
      <!--</video-player>-->
      <div class="contenter flex_center">
        <div class="videoBox" >
		<div  @click="playOrPause()" class="play mask flex_center">
            <img v-show="show" class="playBtn" :src="staticImgH+'bofang.png'"/>
          </div>
          <video v-if="mobile==='android'" id="video"
                 width="100%"
                 height="100%"
                 x5-video-player-fullscreen="true"
                 x5-playsinline
                 playsinline
                 webkit-playsinline
                 preload="auto"
                 poster="xx0.jpg"
                 :src="video_info.video_introduction"  >
          </video>
          <video v-if="mobile==='iPhone'" id="video"
                 width="100%"
                 height="100%"
                 poster="xx0.jpg"
                 :src="video_info.video_introduction"  >
          </video>
        </div>
      </div>

    </div>
    <div class="video_caozuo">

      <span class="video_fenxiang"><img @click="wxShare" :src="staticImgH+'fenxiang.png'" alt=""></span>
      <span class="video_fenxiang">
        <img v-if="!video_info.is_videos" @click="zan()" :src="staticImgH+'shouchang.png'" alt="">
        <img v-if="video_info.is_videos" @click="zan()" :src="staticImgH+'xihuan.png'" alt="">
      </span>
      <span class="video_toupiao" @click="toPlayerDetail(currentPlayerData.id)">投票</span>
      <!--<span v-if="video_info.concern" class="video_toupiao" @click="vote()">投票</span>-->
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
  import wx from 'weixin-jsapi'
  import qs from 'qs'
  import {videoPlayer} from 'vue-video-player'
  import 'video.js/dist/video-js.css'

  export default {
    name: "PlayerStyleDetailed",
    data() {
      return {
        followFlag: false,
        zanFlag: false,
        voteFlag: false,

        playerOptions:{},

        show:true,
        mobile:"",
        text:"",


        PlayerStyleData: '',
        currentPlayerData: {},
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJpc3MiOiJodHRwczpcL1wvbG92eW91LnRvcCIsImF1ZCI6Imh0dHBzOlwvXC9sb3Z5b3UudG9wIiwiaWF0IjoxNTY5NDA4NzE2LCJuYmYiOjE1Njk0MDg3MTYsImV4cCI6MTYwMDk0NDcxNn0.FPH-pgQp-2Vt1kbnZc_Z9JnJYvGYMeLOUHtkC4Tyj_w',
        // 提示盒子
        promptContent: '', //提示盒子的内容
        showPrompt: false,//提示盒子的吸收和显示,
        video_info: {
          username:	null,
          player_id:	0,
          head_pic:	null,
          video_introduction:	null,
          names: '',
          division_id: null,
          concern: 0,
          is_videos: 0,
          rank: 0
        }
      };
    },

  components: {
    videoPlayer
  },

    computed: {
      ...mapState(['staticImgH', 'tokenH', 'playerStyleDetailedPlayer'])
    },
    created(){
      this.text=navigator.appVersion
      this.mobile = navigator.appVersion.indexOf('iPhone') !== -1 ? 'iPhone' :  'android'
    },

    mounted() {
      this.video = document.getElementById('video')
      this.video.currentTime = 0.1;
      this.currentPlayerData=this.playerStyleDetailedPlayer

      //视频详情
      let obj = qs.stringify({
        v_id: this.currentPlayerData.v_id,
        player_id: this.currentPlayerData.id
      })
      this.$http.post('api/user/vide_info', obj, {
        headers: {
          'authorization': this.token
        }
      }).then((res) => {
        if (res.data.code === 200) {
          this.video_info = res.data.data
        }
      })
    },

    methods: {
      //   返回
      toReturn() {
        this.$router.push('/PlayerStyle');
      },
      playOrPause(){
        console.log(this.video.paused)
        // 正在播放
        if(this.video.paused) {
          this.video.play();
          this.show = false
        } else {
          this.video.pause();
          this.show = true
        }

      },
      //   跳选手详情
      toPlayerDetail(id){
        this.playerIds(id)//保存选手id
        this.PlayerStyleDetailedInfo({currentPlayerData: this.currentPlayerData})
        this.addressIdIsSels('false') //投票盒子不显示
        this.PlayerDetailPages('/PlayerStyleDetailed')  //选手详情返回页面
        this.playDetailVoteDivs('true') //选手详情的投票盒子的消失
        this.$router.push('/PlayerDetails')
      },
      // 赞
      zan(){
        let obj = qs.stringify({
          type: '2',
          player_id: this.currentPlayerData.id,
          v_id: this.currentPlayerData.v_id
        })
        this.$http.post('api/user/user_like', obj, {
          headers: {
            'authorization': this.tokenH
          }
        }).then((res) => {
          if (res.data.code === 200) {
            //OK'是取消点赞; 'result'=>'2'，数字表示店点赞成功
            let result = res.data.data.result
            if (result === 'OK') {
              this.video_info.is_videos = 0;
              this.toastMsg("取消点赞成功");
            } else if (result !== 'OK') {
              this.video_info.is_videos = 1;
              this.toastMsg("点赞成功");
            }
          }
        })
      },
      // 关注
      follow(){
        let obj = qs.stringify({
          type: '4',
          player_id: this.currentPlayerData.id,
          v_id: this.currentPlayerData.v_id
        })
        this.$http.post('api/user/user_like', obj, {
          headers: {
            'authorization': this.token
          }
        }).then((res) => {
          if (res.data.code === 200) {
            //OK'是取消点赞; 'result'=>'2'，数字表示店点赞成功
            if (res.data.data.result === 'OK') {
              this.video_info.concern = 0;
              this.toastMsg("取消关注成功");
            }else {
              this.video_info.concern = 1;
              this.toastMsg("关注成功");
            }
          } else {
            this.toastMsg(res.data.msg);
          }
        })
      },// 关注
      vote(){
        let obj = qs.stringify({
          player_id: this.video_info.player_id,
        })
        this.$http.post('api/user/spend_vote', obj, {
          headers: {
            'authorization': this.token
          }
        }).then((res) => {
          if (res.data.code === 200) {
            this.toastMsg("投票成功")
            this.voteFlag  = true;
          } else {
            this.voteFlag  = false;
            this.toastMsg(res.data.msg)
          }
        })
      },
      toastMsg(msg) {
        var self = this
        clearInterval(self.timer2);
        this.promptContent = msg
        this.showPrompt = true
        self.timer2 = setTimeout(function () {
          self.showPrompt = false
          clearInterval(self.timer2);
        }, 2000)
      },
      wxShare(){
        //   微信分享
        var Wobj=qs.stringify({
          player_id:this.currentPlayerData.id,
          type:2,
        })
        this.$http.post('/api/wechat/get_sign',Wobj,{
          headers: {
            'authorization': this.tokenH
          }
        }).then((res)=>{
          if(res.data.code===200){
            debugger
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
        var realLocation=vm.apiH+'/#/PlayerDetails?player_id='+vm.playerId
        wx.ready(function () {   //需在用户可能点击分享按钮前就先调用
          wx.onMenuShareAppMessage({
            title:vm.test, // 分享标题
            desc:'快来给我投票吧', // 分享描述
            link:vm.apiH+'/static/html/redirect.html?app3Redirect='+encodeURIComponent(realLocation), // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: vm.detailData.head_pic, // 分享图标
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
            imgUrl:vm.detailData.head_pic, // 分享图标
            success: function (res) {
            },
          })
        });
      },
      ...mapMutations(['playerIds','PlayerDetailPages','addressIdIsSels','playDetailVoteDivs', 'PlayerStyleDetailedInfo']),

    }
  }

</script>
<style scoped lang="stylus">
.PlayerStyle{
    width:100%;
}
.PlayerRanking_header{
    width:100%
    height:1.23rem;
    display :flex;
    align-items :center;
    justify-content :center;
    position :fixed;
	z-index:999;
    >img{
        width:0.32rem;
        height:0.56rem;
        position :absolute;
        top:50%;
        margin-top:-0.28rem;
        left:0.27rem;
    }
    >span{
        font-size:0.48rem;
        color:rgba(0, 0, 0, 1);
    }
}
.player_top{
            display :flex;
            align-items :center;
            justify-content :space-between;
            margin-bottom:0.313rem;
			position :fixed;
			z-index:999;
			margin-top:1.2rem;
			left:0.27rem;
			background:rgba(255,255,255,0.8);
			padding:0.14rem;
			border-radius:0.92rem;
            .player_name{
                display :flex;
                align-items :center;
                >img{
                    width:0.853rem;
                    height:0.853rem;
                    background :pink;
                    margin-right:0.187rem;
					border-radius:0.92rem;
                }
                >span{
                    font-size:0.44rem;
                    color:rgba(0, 0, 0, 0.8);
                    font-weight:550;
                }
				>.guanzhu{background:rgba(255,157,172,1); width:1.6rem; height:0.8rem; border-radius:0.92rem; line-height:0.8rem; color:#fff; text-align:center; font-size:0.42rem; margin-left:0.3rem;}
            }
        }
        >.player_center{
            width:4.44rem;
            height:4.44rem;
            margin-bottom:0.347rem;
            >video{
                width:100%;
                height:100%;
            }
			>.bofang{ width:100%; height:2rem; text-align:center; margin-top:-3.4rem;
			>img{ width:1.6rem; height:1.6rem;}
			}
			>img{ width:4.44rem; height:4.44rem;border-radius:0.2rem 0.2rem 0rem 0rem;}
        }
        >.player_bottom{
            display :flex;
            align-items :center;
            justify-content :space-between;
            font-size:0.32rem;
            color:rgba(0, 0, 0, 1);
            >.player_Number{
                font-size:0.32rem;
                color:rgba(0, 0, 0, 0.8);
            }
        }
.video{ width:100%; height:100%; background:#444; position: fixed; top:100;
>video{ width:100%; height:100%;}
}
.player_paiming{ position: fixed; z-index:999; top:2.6rem; text-align:center; font-size:0.37rem; background:rgba(255,255,255,0.8); margin-left:0.3rem; border-radius:0.4rem; padding:0.1rem 0.2rem;}
// 提示盒子
.promptFather{
    width:100%;
    position :fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
    display :flex;
    justify-content :center;
    align-items :center;
    z-index:999;
    >.prompt{
        padding:0.2rem 0.35rem;;
        background :rgba(0,0,0,0.7);
        color:#fff;
        border-radius:0.5rem;
        font-size:0.37rem;
    }
}
*::-webkit-media-controls-panel {
  display: none!important;
  -webkit-appearance: none;

}
*::--webkit-media-controls-play-button {
  display: none!important;
  -webkit-appearance: none;
}

*::-webkit-media-controls-start-playback-button {
  display: none!important;
  -webkit-appearance: none;
}
.video_caozuo{ position: fixed; z-index:999; bottom:0.4rem; right:0.27rem; display:flex; align-items:center; justify-content:space-between;
>img{ height:0.6rem; margin-right:0.4rem;}
>.video_toupiao{ background:rgba(255,255,255,0.8); padding:0rem 0.7rem; height:1rem; border-radius:0.92rem; color:#FF9DAC; line-height:1rem; font-size:0.44rem;}
>.video_fenxiang{ background:rgba(255,255,255,0.8); border-radius:0.92rem; width:1rem; height:1rem; text-align:center; margin-right:0.4rem;
>img{ height:0.6rem; margin-top:0.2rem;}
}
}

.video-js .vjs-big-play-button{
  background-color: red;
}
.ovideo{width:100%; height:100%; background:#444; position: fixed;}
.contenter{width:100%; height:100%; position: fixed;}
.videoBox{width:100%; height:100%; position: fixed;}
.mask{width:100%; height:100%; position: fixed; z-index:999; text-align:center;
>img{ width:1.6rem; position:fixed; top:48%; left:42%; z-index:9999;}
}
.video-js.vjs-fluid, .video-js.vjs-16-9, .video-js.vjs-4-3{width:100%!important; height:100%!important; background:#444!important; position: fixed!important;}
</style>
