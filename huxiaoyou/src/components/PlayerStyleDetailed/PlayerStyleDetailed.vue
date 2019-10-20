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

        <span class="guanzhu" v-if="!followFlag" @click="follow()">关注</span>
        <span class="guanzhu" v-if="followFlag" @click="follow()">取消关注</span>
      </div>
    </div>
    <div class="player_paiming">{{currentPlayerData.names}}排名：{{currentPlayerData.division_ranking}}名</div>
    <div class="video">
      <!--<video controls="controls" autoplay="autoplay" src="https://www.w3school.com.cn/i/movie.ogg"></video>-->
      <video controls="controls" autoplay="autoplay" :src="currentPlayerData.video_introduction"></video>
    </div>
    <div class="video_caozuo">

      <span class="video_fenxiang"><img @click="toReturn" :src="staticImgH+'fenxiang.png'" alt=""></span>
      <span class="video_fenxiang">
        <img v-if="!zanFlag" @click="zan()" :src="staticImgH+'shouchang.png'" alt="">
        <img v-if="zanFlag" @click="zan()" :src="staticImgH+'xihuan.png'" alt="">
      </span>
      <span v-if="!voteFlag" class="video_toupiao" @click="vote()">投票</span>
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
    name: "PlayerStyleDetailed",
    data() {
      return {
        followFlag: false,
        zanFlag: false,
        voteFlag: false,


        PlayerStyleData: '',
        currentPlayerData: this.$route.query.player,
        token: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJpc3MiOiJodHRwczpcL1wvbG92eW91LnRvcCIsImF1ZCI6Imh0dHBzOlwvXC9sb3Z5b3UudG9wIiwiaWF0IjoxNTY5NDA4NzE2LCJuYmYiOjE1Njk0MDg3MTYsImV4cCI6MTYwMDk0NDcxNn0.FPH-pgQp-2Vt1kbnZc_Z9JnJYvGYMeLOUHtkC4Tyj_w',
        // 提示盒子
        promptContent: '', //提示盒子的内容
        showPrompt: false,//提示盒子的吸收和显示,
        video_info: {}
      };
    },

//   components: {},

    computed: {
      ...mapState(['staticImgH'])
    },

    mounted() {
      console.log(this.currentPlayerData);
      //个人信息
      // let obj = qs.stringify({
      //   player_id: this.currentPlayerData.id
      // })
      // this.$http.post('api/player/info', obj, {
      //   headers: {
      //     'authorization': this.token
      //   }
      // }).then((res) => {
      //   if (res.data.code === 200) {
      //     console.log(res.data.data)
      //     this.currentPlayerData = res.data.data
      //   }
      // })

      //视频详情
      let obj = qs.stringify({
        v_id: this.currentPlayerData.id,
        player_id: this.currentPlayerData.id
      })
      this.$http.post('api/player/info', obj, {
        headers: {
          'authorization': this.token
        }
      }).then((res) => {
        if (res.data.code === 200) {
          console.log(res.data.data)
          this.video_info = res.data.data
        }
      })
    },

    methods: {
      //   返回
      toReturn() {
        // this.$router.push('/PlayerStyle');
        this.$router.go(-1);
      },
      // 赞
      zan(){
        let obj = qs.stringify({
          type: '4',
          player_id: this.currentPlayerData.player_id,
          v_id: this.currentPlayerData.v_id
        })
        this.$http.post('api/player/info', obj, {
          headers: {
            'authorization': this.token
          }
        }).then((res) => {
          if (res.data.code === 200) {
            //OK'是取消点赞; 'result'=>'2'，数字表示店点赞成功
            let result = res.data.result
            if (result === 'OK') {
              this.followFlag = false;
              this.toastMsg("取消点赞成功");
            } else if (result === '2') {
              this.followFlag = true;
              this.toastMsg("点赞成功");
            }
          }
        })
      },
      // 关注
      follow(){
        let obj = qs.stringify({
          type: '4',
          player_id: this.currentPlayerData.player_id,
          v_id: this.currentPlayerData.v_id
        })
        this.$http.post('api/player/info', obj, {
          headers: {
            'authorization': this.token
          }
        }).then((res) => {
          if (res.data.code === 200) {
            //OK'是取消点赞; 'result'=>'2'，数字表示店点赞成功
            let result = res.data.result
            if (result === 'OK') {
              this.followFlag = false;
              this.toastMsg("取消关注成功");
            } else if (result === '2') {
              this.followFlag = true;
              this.toastMsg("关注成功");
            }
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
      }

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
.video{ width:100%; height:100%; background:#444; position: fixed; top:0;
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
</style>
