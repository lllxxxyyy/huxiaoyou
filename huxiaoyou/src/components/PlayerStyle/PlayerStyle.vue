<!--  -->
<template>
  <div class="PlayerStyle">
    <div class="PlayerRanking_header">
      <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
      <span>选手风采</span>
    </div>
    <div class="hideDiv"></div>
    <div class="player_style_tuijian"><span>每日精彩推荐</span> <span class="more" @click="toHome">了解更多</span></div>
    <ul class="player_list">
      <li v-for="(item,index) in PlayerStyleData" :key="index" v-if="index<6">
        <div class="player_center">
          <video v-if="item.video_introduction" @click.stop="goGoodsPage(item)" :poster="item.video_introduction+'?x-oss-process=video/snapshot,t_10000,m_fast'">
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
    <div class="player_style_tuijian"><span>实时风采</span></div>
    <ul class="player_list_fencai">
      <li v-for="(item,index) in PlayerStyleData" :key="index" >
        <div class="player_center">
          <video v-if="item.video_introduction" @click.stop="goGoodsPage(item)" :poster="item.video_introduction+'?x-oss-process=video/snapshot,t_10000,m_fast'">
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
    <div class="newsList">
      <div v-for="(items, index) in newsList" :key="index">
        <div class="date">{{showDay(index)}}</div>
        <div class="list">
          <ul>
            <li class="list-item" v-for="(item,index) in items" :key="index">
              <span class="text">{{item.title}}</span>
              <img :src="attachImageUrl(item.images[0])" class="image"/>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="gengduo">
      <div class="gengduo_right" v-if="this.currentPage >= this.lastPage">
        <span>没有更多了</span>
      </div>
      <!--加载的效果-->
      <div v-if="loading" class="gengduo_left">
        <div class="loading">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
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
        lastPage: 1,
        // 提示盒子
        promptContent: '', //提示盒子的内容
        showPrompt: false,//提示盒子的吸收和显示

        newsList: [],
        date: [],
        todayDate: '',
        REQUIRE: true,
        loading: false,
        tips: '努力加载中...',
        currentPage: 0,
      };
    },

//   components: {},

    computed: {
      ...mapState(['staticImgH'])
    },

    mounted() {
      // 添加滚动事件，检测滚动到页面底部
      window.addEventListener('scroll', this.scrollBottom)
      this.getPageVideo();
    },
    props: ["goodsImage", "goodsName", "goodsPrice", "PlayerStyleDetailedId"],
    methods: {
      // 点了解更多跳首页
      toHome(){
        this.$router.push('/')
      },
      //   跳选手详情
      toPlayerDetail(id) {
        this.playerIds(id) //保存选手id
        this.addressIdIsSels('false') //投票盒子不显示
        this.PlayerDetailPages('/PlayerStyle')  //选手详情返回页面
        this.playDetailVoteDivs('true') //选手详情的投票盒子的消失
        this.$router.push('/PlayerDetails')
      },
      //   返回
      toReturn() {
        this.$router.push('/')
      },
      goGoodsPage(player) {
          this.playerVideoPages('/PlayerStyle')   //设置选手视频返回页面
          this.PlayerStyleDetailedPlayer(player);  //给选手视频页面传player
          this.$router.push('/PlayerStyleDetailed') 
      },
      getPageVideo() {
        if (this.currentPage >= this.lastPage) {
          return false;
        }
        this.loading = true
        this.currentPage += 1
        let obj = qs.stringify({
          page: this.currentPage,
          limit: 10
        })
        this.$http.post('api/player/player_style', obj, {
          headers: {
            'authorization': this.token
          }
        }).then((res) => {
          this.loading = false
          if (res.data.code === 200) {
            this.PlayerStyleData = this.PlayerStyleData.concat(res.data.data.data)
            this.lastPage = res.data.data.last_page
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
      // 滚动到页面底部时，
      scrollBottom() {
        if (this.loading) {
          return false;
        }
        this.getPageVideo();
      },
      ...mapMutations(['playerIds', 'addressIdIsSels', 'PlayerDetailPages', 'playDetailVoteDivs', 'PlayerStyleDetailedPlayer','playerVideoPages']),
    }
  }

</script>
<style scoped lang="stylus">

  @import "../../assets/css/load.css"
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
    position :fixed;
    top:0;
    left:0;
    background:#fff;
    z-index:5;
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
.hideDiv{
  height:1.23rem;
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
.player_list_fencai{
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
   background:rgba(74,171,249,0.8);
   margin-top: 0.41rem;
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
                    font-size:0.3rem;
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
.player_style_tuijian{display:flex;align-items:center;justify-content: space-between;padding:0 0.36rem; font-size:0.44rem; font-weight:550; margin-top:0.14rem; margin-bottom:0.44rem;
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


</style>
