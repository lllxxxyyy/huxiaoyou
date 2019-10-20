<!--  -->
<template>
  <div class="PlayerStyle">
      <div class="PlayerRanking_header">
          <img @click="toReturn" :src="staticImgH+'zuojiantoub.png'" alt="">
      </div>
	  <div class="player_top" v-for="(item,index) in PlayerStyleData" :key="index">
               <div class="player_name">
                 <img v-if="item.avatar" :src="item.avatar" alt="">
               <span>{{item.username}}</span>
			   <span class="guanzhu">关注</span>
            </div>
       </div>
	   <div class="player_paiming">华北赛区排名：23名</div>
	  <div class="video">
	  	 <video controls="controls" autoplay="autoplay" src="https://www.w3school.com.cn/i/movie.ogg"></video>
	  </div>
	  <div class="video_caozuo">
	  	<img @click="toReturn" :src="staticImgH+'xihuan.png'" alt="">
		<span class="video_fenxiang"><img @click="toReturn" :src="staticImgH+'fenxiang.png'" alt=""></span>
		<span class="video_fenxiang"><img @click="toReturn" :src="staticImgH+'shouchang.png'" alt=""></span>
		<span class="video_toupiao">投票</span>
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
    name:"PlayerStyleDetailed",
  data () {
    return {
        PlayerStyleData:'',
        token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJpc3MiOiJodHRwczpcL1wvbG92eW91LnRvcCIsImF1ZCI6Imh0dHBzOlwvXC9sb3Z5b3UudG9wIiwiaWF0IjoxNTY5NDA4NzE2LCJuYmYiOjE1Njk0MDg3MTYsImV4cCI6MTYwMDk0NDcxNn0.FPH-pgQp-2Vt1kbnZc_Z9JnJYvGYMeLOUHtkC4Tyj_w',
         // 提示盒子
      promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
    };
  },

//   components: {},

  computed:{
        ...mapState(['staticImgH'])
    },

  mounted(){
      var obj=qs.stringify({
          page:1
      })
      this.$http.post('api/player/player_style',obj,{
          headers: {
              'authorization':this.token
          }
    }).then((res)=>{
        console.log(res)
        if(res.data.code==200){
            this.PlayerStyleData=res.data.data.data
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

  methods: {
    //   返回
      toReturn(){
          this.$router.push('/PlayerStyle')
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