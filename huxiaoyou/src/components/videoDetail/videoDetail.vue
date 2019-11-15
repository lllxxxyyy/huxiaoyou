<template>
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
                 :poster="videoSrc+'?x-oss-process=video/snapshot,t_10000,m_fast'"
                 :src="videoSrc"  >
          </video>
          <video v-if="mobile==='iPhone'" id="video"
                 width="100%"
                 height="100%"
                 :poster="videoSrc+'?x-oss-process=video/snapshot,t_10000,m_fast'"
                 :src="videoSrc"  >
          </video>
        </div>
      </div>

    </div>
</template>
 
<script>
import {mapState} from 'vuex'
  import {mapMutations} from 'vuex'
  import {videoPlayer} from 'vue-video-player'
  import 'video.js/dist/video-js.css'
export default {
	name: 'living',
	data () {
		return {
            show:true,
            videoSrc:'',
        }
    },
     computed: {
      ...mapState(['staticImgH'])
    },
    created(){
      this.text=navigator.appVersion
      this.mobile = navigator.appVersion.indexOf('iPhone') !== -1 ? 'iPhone' :  'android'
    },
    mounted(){
         this.video = document.getElementById('video')
      this.video.currentTime = 0.1;
            this.videoSrc=this.$route.query.videoSrc
    },
	methods: {
        //事件
        toReturn(){
            this.$router.push('/')
        },
        playOrPause(){
            // 正在播放
            if(this.video.paused) {
                this.video.play();
                this.show = false
            } else {
                this.video.pause();
                this.show = true
            }

      },
	}
}
</script>
 
<style scoped lang="stylus">
.container{
    width:100%;
    height:100%;
    >.play{
        width:100%;
        margin-top:0.6rem;
    }
}
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
    }
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