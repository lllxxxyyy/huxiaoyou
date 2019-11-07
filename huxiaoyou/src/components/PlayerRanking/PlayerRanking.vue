<!-- 选手暂时 -->
<template>
  <div class="PlayerRankingHome">
    <div class="PlayerRanking_header">
      <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
      <span>选手排名</span>
      <div class="top_list" @click="toPlayerRankingList()">top榜</div>
    </div>
    <div class="SpecialTopicBody_content">
      <div class="SpecialTopicBody_center" v-for="(item, index) in topThree" :key="index">
        <div class="SpecialTopicBody_li">
          <span>{{item.names}}（排位前三名）</span>
          <span class="more" @click="toMore(item,index)">查看更多&gt;&gt;</span>
        </div>
        <div class="SpecialTopicBody_list">
          <ul class="HomeAngel_listTwo">
            <li v-for="(player, seqNum) in item.players" :key='seqNum' @click="toPlayerDetail(player.id, 'false')">
              <img class="Two_img"
                   :src="player.avatar"
                   alt="">
              <div class="top_img"><img :src="staticImgH+'paiming'+(seqNum+1)+'.png'" alt=""></div>
              <!-- <div class="ta_vote" @click.stop="toPlayerDetail(player.id, 'true')">给Ta投票</div> -->
              <span class="angelNameTwo">选手：{{player.username}}</span>
              <span class="angelPriceTwo">编号：{{player.id}}</span>
            </li>
          </ul>
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
    name:'PlayerRanking',
    data () {
        return {
            SpecialTopicBodyBar:'',
            SpecialBarindex:0,
            RankingData:'',
            RankingImgData:[],
            barId:0,
            topThree: [],

             // 提示盒子
            promptContent:'', //提示盒子的内容
            showPrompt:false,//提示盒子的吸收和显示
        };
    },
//   components: {},
//   created(){
//     this.getTopThree();
//   },

    computed:{
            ...mapState(['staticImgH','tokenH','barIdINdex'])
        },

  mounted(){
      this.$http.post('api/division/list').then((res)=>{
         this.SpecialTopicBodyBar=res.data.data
         if(this.barIdINdex){
           this.barId=this.barIdINdex
         }else{
           this.barId=res.data.data[0].id
         }
         this.getlistData()
    })


  },

  methods: {
    toPlayerRankingList(){
      this.$router.push('/TopList')
    },
    //   跳选手详情
    toPlayerDetail(id, voteFlag){
        this.playerIds(id)//保存选手id
        this.addressIdIsSels('false') //进入选手详情默认不选择地址
        this.PlayerDetailPages('/PlayerRanking')  //选手详情返回页面
        this.playDetailVoteDivs(voteFlag) //选手详情的投票盒子的消失
        this.$router.push('/PlayerDetails')
    },
      SpecialBarBtn(index,id){
          this.barId=id
          this.SpecialBarindex=index
          this.getlistData()
      },
      toReturn(){
          this.$router.push('/')
      },
    toMore(item){
        this.barIdINdexs(item.id)
        this.$router.push('/PlayerRankingList')
    },
    alert(msg){
      let self=this;
      clearInterval(self.timer2);
                      this.promptContent=msg
                      this.showPrompt=true
                      self.timer2=setTimeout(function(){
                          self.showPrompt=false
                          clearInterval(self.timer2);
                      },2000)
    },
      getTopThree(){
        var obj=qs.stringify({
          page:1
        })
        this.$http.post('api/division/players/',obj).then((res)=>{
          if(res.data.code===200){
            this.topThree=res.data.data.data
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
    //   获取数据
      getlistData(){
      this.getTopThree();
            // var obj=qs.stringify({
            //     page:1
            // })
            // this.$http.post('api/player/division_ranking/'+this.barId,obj,{
            //     headers: {
            //         'authorization': this.tokenH
            //     }
            // }).then((res)=>{
            //     if(res.data.code===200){
            //          this.RankingData=res.data.data.data
            //     }else{
            //          var self=this
            //         clearInterval(self.timer2);
            //                 this.promptContent=res.data.msg
            //                 this.showPrompt=true
            //                 self.timer2=setTimeout(function(){
            //                     self.showPrompt=false
            //                     clearInterval(self.timer2);
            //                 },2000)
            //             return false;
            //     }
            //
            // });
      },
      ...mapMutations(['playerIds','PlayerDetailPages','addressIdIsSels','playDetailVoteDivs','barIdINdexs']),
  }
}

</script>
<style scoped lang='stylus'>
.PlayerRankingHome{
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
	>.top_list{right:0.27rem; position: absolute; font-size:0.44rem;}
}

.SpecialTopicBody_bar{
    width:100%;
    height:1.147rem;
    // border-bottom:0.03rem solid #eeeeee;
    padding:0 0.27rem;
    background :#fff;
    >ul{
        height:1.147rem;
        display :flex;
        align-items :center;
         overflow-x:scroll;
        display: -webkit-box;
        -webkit-box-align: center;
        align-items :center;
        z-index :-1;
        >li{
            height:1.147rem;
            line-height :1.147rem;
            font-size:0.37rem;
            color:rgba(0, 0, 0, 0.6);
            margin-right:0.764rem;
        }
        >.Special_barColor{
            color:rgba(0, 0, 0, 0.8);
            font-weight:550;
            position :relative;
            // &:before{
            //     content:'';
            //     width:100%;
            //     height:0.04rem;
            //     background :#f15055;
            //     position :absolute;
            //     bottom:0.03rem;
            //     left:0;
            // }
        }
    }
}

.HomeAngel_listTwo{
    display :flex;
    justify-content:space-between;
    flex-wrap:wrap;
    margin-top:0.27rem;
    >li{
        width:2.6rem;
        display:flex;
        flex-direction :column;
		position: relative;
        >img{
            width:2.6rem;
            height:2.6rem;
            background :skyblue;
        }
       >.angelNameTwo{
           font-size:0.347rem;
           color:rgba(0, 0, 0, 0.8);
           font-weight:550;
           margin-top:0.27rem;
           margin-bottom:0.053rem;
           line-height :0.5rem;
           display:-webkit-box;
           -webkit-box-orient:vertical;
           word-break:break-all;
           overflow:hidden;
           -webkit-line-clamp:1;

       }
       >.angelPriceTwo{
           color:rgba(0, 0, 0, 0.8);
           font-size:0.32rem;
           line-height :0.45rem;

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
.SpecialTopicBody_content{padding:0 0.4rem;}
.SpecialTopicBody_center{padding:0.4rem 0.4rem; margin-bottom:0.2rem; box-shadow:0px 3px 12px 0px rgba(255,204,212,0.5); border-radius:0.2rem;}
.SpecialTopicBody_li{justify-content: space-between; display: flex; margin-bottom:0.4rem;}
.SpecialTopicBody_li span{ font-size: 0.4rem;}
.SpecialTopicBody_li .more{ color:#999; font-size: 0.37rem;}
.Two_img{width:100%; height:100%; border-radius:0.16rem;}
.top_img{ position:absolute; color:#fff; margin-top:0.1rem; margin-left:0.1rem; width:0.4rem; height:0.4rem;}
.top_img img{ width:0.4rem; height:0.4rem; display:block;}
.ta_vote{ position:absolute; font-size:0.37rem; margin-left:0.46rem; right:0; bottom:1.21rem; width:2rem; height:0.8rem; line-height:0.9rem; color:#fff; font-size:0.4rem; text-align:center; background:url(../../../static/mock/img/toupiao.png) right center no-repeat; background-size:cover;}
.ta_vote1{ background:url(../../../static/mock/img/toupiao1.png) right center no-repeat; background-size:cover;}
</style>
