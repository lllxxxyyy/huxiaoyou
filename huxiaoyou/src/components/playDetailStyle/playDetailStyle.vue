<!-- 选手详情风采列表 -->
<template>
  <div class="PlayerStyle">
        <div class="PlayerRanking_header">
            <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
            <span>{{playerName}}的视频</span>
        </div>
        <ul class="player_list">
            <li v-for="(item,index) in PlayerStyleData" :key="index">
                <div class="player_center">
                    <video v-if="item.video_introduction"  @click="goGoodsPage(item)" id="video1" :poster="item.video_introduction+'?x-oss-process=video/snapshot,t_10000,m_fast'">
                        <source :src="item.video_introduction" type="video/mp4">
                    </video>
                    <div class="bofang"><img @click="goGoodsPage(item)" :src="staticImgH+'bofang.png'" alt=""></div>
                </div>
                <span class="player_btn" @click="toPlayerDetail(item.id)">投票</span>
            </li>
        </ul>
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
    name: "PlayerStyle",
    data() {
      return {
        PlayerStyleData: [],
        // 提示盒子
        promptContent: '', //提示盒子的内容
        showPrompt: false,//提示盒子的吸收和显示
      };
    },

//   components: {},

    computed: {
      ...mapState(['staticImgH','playerId','playerName'])
    },

    mounted() {
      var obj = qs.stringify({
        page: 1,
        player_id:this.playerId
      })
      this.$http.post('api/player/player_style', obj).then((res) => {
        if (res.data.code === 200) {
            this.PlayerStyleData = res.data.data.data
        } else {
          var self = this
          clearInterval(self.timer2);
          this.promptContent = res.data.msg
          this.showPrompt = true
          self.timer2 = setTimeout(function () {
            self.showPrompt = false
            clearInterval(self.timer2);
          }, 2000)
          return false;
        }

      })
    },
    props: ["goodsImage", "goodsName", "goodsPrice", "PlayerStyleDetailedId"],
    methods: {
      //   跳选手详情
      toPlayerDetail(id) {
        this.playerIds(id)//保存选手id
        this.addressIdIsSels('false') //设置地址没选中
        this.PlayerDetailPages('/PlayerStyle')  //选手详情返回页面
        this.playDetailVoteDivs('true') //选手详情的投票盒子的消失
        this.$router.push('/PlayerDetails')
      },
      //   返回
      toReturn() {
            this.playerIds(this.playerId)//保存选手id
            this.addressIdIsSels('false') //设置地址没选中
            this.PlayerDetailPages('/PlayerStyle')  //选手详情返回页面
            this.playDetailVoteDivs('false') //选手详情的投票盒子的消失
            this.$router.push('/PlayerDetails')
      },
      goGoodsPage(player) {
            this.playerVideoPages('/playDetailStyle')
            this.PlayerStyleDetailedPlayer(player);
            this.$router.push('/PlayerStyleDetailed')
      },
      ...mapMutations(['playerIds', 'addressIdIsSels', 'PlayerDetailPages', 'playDetailVoteDivs', 'PlayerStyleDetailedPlayer','playerVideoPages']),
    }
  }

</script>
<style scoped lang="stylus">
.PlayerStyle{
    width:100%;
    background :#fff;
}
.PlayerRanking_header{
    width:100%
    height:1.23rem;
    display :flex;
    align-items :center;
    justify-content :center;
    position :relative;
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
.player_list{
    padding:0 0.36rem;
    padding-top:0.27rem;
	display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    >li{
        width:4.44rem;
        margin-bottom:0.3rem;
        box-shadow:0px 3px 12px 0px rgba(255,204,212,0.5); border-radius:0.2rem;
		>.player_btn{
            width:4.44rem;
            height:0.84rem;
            color:#fff;
            font-size:0.4rem;
            text-align :center;
            line-height :0.84rem;
            font-weight:550;
            display:block;
            position: absolute;
            margin-top:-0.84rem;
            background:rgba(255,157,172,0.8);
            margin-bottom:0.31rem;
        }
        >.player_center{
            width:4.44rem;
            height:4.44rem;
            >video{
                width:100%;
                height:100%;
            }
			>.bofang{ width:100%; height:2rem; text-align:center; margin-top:-3.4rem;
			>img{ width:1.6rem; height:1.6rem;}
			}
			>img{ width:4.44rem; height:4.44rem;border-radius:0.2rem 0.2rem 0rem 0rem;}
        }
    }
}

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
        padding:0.2rem 0.35rem;
        background :rgba(0,0,0,0.7);
        color:#fff;
        border-radius:0.5rem;
        font-size:0.37rem;
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
