<!-- 精彩视频 -->
<template>
  <div class="wonderfulVideo">
      <div class="wonderfulVideo_title"><span>推广视频</span> </div>
      <ul class="voideo_list">
        <li v-for="(item,index) in videoImg" :key="index" @click="tovideoDetail(item.value)">
          <img class="bofangBtn" :src="staticImgH+'bofangBtn.png'" alt="">
          <img class="videoImg"  alt="" :src="item.img">
        </li>
      </ul>

      <div class="player_style_tuijian"><span>选手每日精彩推荐</span></div>
      <ul class="player_list">
        <li v-for="(item,index) in PlayerStyleData" :key="index" v-if="index<6">
          <div class="player_center">
            <video v-if="item.video_introduction" :poster="item.video_introduction+'?x-oss-process=video/snapshot,t_10000,m_fast'"  @click.stop="goGoodsPage(item)">
              <source :src="item.video_introduction" type="video/mp4"/>
            </video>
            <!--<img v-if="item.video_introduction" @click="goGoodsPage(item)" :src="item.video_introduction[1].src"/>-->
          </div>
          <div class="bofang" @click="goGoodsPage(item)"><img @click="goGoodsPage(item)" :src="staticImgH+'bofang.png'"
                                                              alt=""></div>
          <span class="player_btn" @click="toPlayerDetail(item.id)">投票</span>
          <div class="player_top">
            <div class="player_name">
              <img v-if="item.avatar" :src="item.avatar" alt="">
              <span>{{item.username}}</span>
            </div>
          </div>
          <!--<div class="player_bottom">
              <span class="player_Number">总票数：{{item.votes}}</span><span>{{item.names}}+{{item.id}}</span>
            </div>-->
        </li>
      </ul>
  </div>
</template>

<script>
import qs from 'qs'
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      videoImg:'',
      PlayerStyleData:'',
    };
  },

  components: {},

  computed:{
        ...mapState(['staticImgH'])
    },

  mounted(){
    this.$http.post('/api/first/first_index').then((res)=>{
          this.videoImg=res.data.data.data
    })
    this.getPageVideo()
  },

  methods: {
    goGoodsPage(player) {
          this.playerVideoPages('/')   //设置选手视频返回页面
          this.PlayerStyleDetailedPlayer(player);  //给选手视频页面传player
          this.$router.push('/PlayerStyleDetailed') 
      },
      //   跳选手详情
      toPlayerDetail(id) {
        this.playerIds(id) //保存选手id
        this.addressIdIsSels('false') //投票盒子不显示
        this.PlayerDetailPages('/PlayerStyle')  //选手详情返回页面
        this.playDetailVoteDivs('true') //选手详情的投票盒子的消失
        this.$router.push('/PlayerDetails')
      },
    tovideoDetail(itemValue){
      this.$router.push({path:'/videoDetail',query:{videoSrc:itemValue}})
    },
    getPageVideo() {
        let obj = qs.stringify({
          page: 1,
          limit: 10
        })
        this.$http.post('api/player/player_style', obj).then((res) => {
          if (res.data.code === 200) {
            this.PlayerStyleData = res.data.data.data
          } else {
            this.toastMsg(res.data.msg)
            return false;
          }
        })
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
       ...mapMutations(['playerIds', 'addressIdIsSels', 'PlayerDetailPages', 'playDetailVoteDivs', 'PlayerStyleDetailedPlayer','playerVideoPages']),
  }
}

</script>
<style scoped lang="stylus">
.wonderfulVideo{
    font-size:0.427rem;
}
.wonderfulVideo_title{
  font-size:0.427rem;
  color:rgba(0, 0, 0, 1);
  display :flex;
  align-items :center;
  margin-bottom:0.32rem;
  margin-top:0.4rem;
  >span{
    margin-left:0.4rem;
    padding-bottom:0.2rem;
    border-bottom:0.053rem solid  rgba(255, 204, 212, 1);
    color:rgba(0, 0, 0, 1);
    font-weight:600;
  }
}
.voideo_list{
  >li{
    width:100%;
    height:5.33rem;
    position :relative;
    margin-bottom:0.32rem;
    >.videoImg{
       width:100%;
       height:100%;
    }
    >.bofangBtn{
      width:0.97rem;
      height:0.97rem;
      position :absolute;
      left:50%;
      top:50%;
      margin-left:-0.453rem;
      margin-top:-0.453rem;
    }
  }
}



.player_style_tuijian{display:flex;align-items:center;justify-content: space-between;padding:0 0.36rem; font-size:0.427rem; font-weight:550; margin-top:0.14rem; margin-bottom:0.44rem;
>span{
    padding-bottom: 0.2rem;
    border-bottom: 0.053rem solid #ffccd4;
    color: #000;
    font-weight: 600;}
>.more{
  font-size:0.37rem;
  color: #000;
  padding-bottom: 0.2rem;
  border-bottom: 0;
  font-style: normal;
}
}
.gengduo{ width:100%; height:2rem; margin-top:0.4rem; font-size:0.4rem;
>.gengduo_left{ margin-left:4.28rem; text-align:center; margin-top:1rem;}
>.gengduo_right{ width:100%; text-align:center;}
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
        margin-bottom:0.4rem;
        box-shadow:0px 3px 12px 0px rgba(255,204,212,0.5); border-radius:0.2rem;
		>.bofang{ width:100%; height:2rem; text-align:center; margin-top:-3.6rem; position: relative;
			>img{ width:1.6rem; height:1.6rem;}
			}
		>.player_btn{
   width:4.44rem;
   height:0.84rem;
   color:#fff;
   font-size:0.4rem;
   text-align :center;
   line-height :0.84rem;
   font-weight:550;
   display:block;
   position: relative;
   margin-top: 0.41rem;
   background:rgba(255,157,172,0.8);
   margin-bottom:0.31rem;
}
        >.player_top{
            display :flex;
            align-items :center;
            justify-content :space-between;
            margin-bottom:0.313rem;
			margin-left:0.14rem;
            .player_name{
                display :flex;
                align-items :center;
                >img{
                    width:0.853rem;
                    height:0.853rem;
                    background :pink;
                    margin-right:0.187rem;
					border-radius:0.22rem;
                }
                >span{
                    font-size:0.34rem;
                    color:rgba(0, 0, 0, 0.8);
                    font-weight:550;
                }
            }
        }
        >.player_center{
            width:4.44rem;
            height:4.44rem;
            margin-bottom:0.347rem;
			overflow: hidden;
			border-radius:0.2rem 0.2rem 0 0;
            >video{
                width: 180%;
    			height: 180%;
    			margin-top: -30%;
    			margin-left: -41%;
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
    }
}
</style>