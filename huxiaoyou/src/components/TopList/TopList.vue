<!-- 选手暂时 -->
<template>
  <div class="PlayerRankingHome">
    <div class="PlayerRanking_header">
      <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
      <span>赛区top榜</span>
    </div>
    <div class="SpecialTopicBody_bar">
      <ul>
        <li @click="SpecialBarBtn(index,item.id)" :class="SpecialBarindex==index?'Special_barColor':''"
            v-for="(item,index) in SpecialTopicBodyBar" :key="index">
          {{item.names}}
        </li>
      </ul>
    </div>
    <div class="top_list_table">
      <div class="top_list_table_list">
        <span class="paiming">排名</span>
        <span class="touxiang">头像</span>
        <span class="xingming">姓名（昵称）</span>
        <span class="bianhao">参赛编号</span>
        <span class="piaoshu">票数</span>
        <span class="jiapiao">为Ta加票</span>
      </div>
      <ul class="TopList">
          <li @click="toPlayerDetail(item.id)"  v-for="(item,index) in RankingData" :key="index">
            <div class="top_list_img">
              <span v-if="index > 2">{{index+1}}</span>
              <img v-if="index < 3" :src="staticImgH+'paiming'+(index+1)+'.png'" alt="">
            </div>
            <span class="touxiang">
            <img v-if="item.photo_introduction[0]" :src="item.photo_introduction[0].src" alt="">
          </span>
            <span class="angelNameTwo">{{item.username}}</span>
            <span class="angelPriceid">{{item.id}}</span>
            <span class="angelPriceTwo">{{item.votes}}</span>
            <div class="top_list_ta_vote" :class="{
              top_list_ta_vote1: index > 2 && index < 100,
              top_list_ta_vote2: index > 100}">投票</div>
            <!--v-if="index==99"最终前100-->
            <div class="tishi" v-if="index==3">最终前100名进入赛区决赛（音乐节），加油冲刺！</div>
          </li>
      </ul>
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
         
             // 提示盒子
            promptContent:'', //提示盒子的内容
            showPrompt:false,//提示盒子的吸收和显示
        };
    },
//   components: {},

    computed:{
            ...mapState(['staticImgH','tokenH'])
        },

  mounted(){
      
      var barobj=qs.stringify({
      })
      this.$http.post('api/division/list',barobj,{
          headers: {
              'authorization': this.tokenH
          }
    }).then((res)=>{
         this.SpecialTopicBodyBar=res.data.data
         this.barId=res.data.data[0].id
         this.getlistData()
    })
    

  },

  methods: {
    //   跳选手详情
    toPlayerDetail(id){
        this.playerIds(id)//保存选手id
        this.addressIdIsSels('false') //投票盒子不显示 
        this.PlayerDetailPages('/PlayerRanking')  //选手详情返回页面
        this.playDetailVoteDivs('false') //选手详情的投票盒子的消失
        this.$router.push('/PlayerDetails')
    },
      SpecialBarBtn(index,id){
          this.barId=id
          this.SpecialBarindex=index
          this.getlistData()
      },
      toReturn(){
          this.$router.push('/PlayerRanking')
      },
    //   获取数据
      getlistData(){
            var obj=qs.stringify({
                page:1
            })
            this.$http.post('api/player/division_ranking/'+this.barId,obj,{
                headers: {
                    'authorization': this.tokenH
                }
            }).then((res)=>{
                if(res.data.code===200){
                     this.RankingData=res.data.data.data
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
      ...mapMutations(['playerIds','PlayerDetailPages','addressIdIsSels','playDetailVoteDivs']),
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
}

.SpecialTopicBody_bar{
    width:100%;
    height:1.147rem;
    // border-bottom:0.03rem solid #eeeeee;
    padding:0 0.27rem;
	margin-top:0.08rem;
	margin-bottom:0.37rem;
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
            font-size:0.44rem;
            color:rgba(0, 0, 0, 0.6);
            margin-right:0.764rem;
        }
        >.Special_barColor{
            color:#FF9DAC;
            position :relative;
            &:before{
                 content:'';
                 width:100%;
                 height:0.04rem;
                 background :#FF9DAC;
                 position :absolute;
                 bottom:0.04rem;
                 left:0;
             }
        }
    }
}

.TopList{
    display :flex;
    justify-content:space-between;
    flex-wrap:wrap;
    padding:0 0.4rem;
    margin-top:0.27rem;
    >li{
        width:100%;
        display:-webkit-box; display:-ms-flexbox; display:flex; -webkit-box-pack:justify; -ms-flex-pack:justify; justify-content:space-between; -ms-flex-wrap:wrap; flex-wrap:wrap; margin-top:0.27rem; margin-bottom:0.14rem;
        >span img{
            width:0.4rem;
            height:0.4rem;
            background :skyblue;
			border-radius:0.06rem;
        }
		>span{display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    }
       >.angelNameTwo{
           font-size:0.347rem;
           color:#fff;
           font-weight:550;
		   display:flex;
           margin-top:0.07rem;
           margin-bottom:0.053rem;
           line-height :0.5rem;
           -webkit-box-orient:vertical;
           word-break:break-all;
           -webkit-line-clamp:1;
           width:26%;
       }
       >.angelPriceTwo{
           color:#fff;
		   display:flex;
           font-size:0.32rem;
           line-height :0.5rem;
		   margin-top:0.07rem;
           margin-bottom:0.053rem;
		   width:10%;
       }
	   >.angelPriceid{
           color:#fff;
		   display:flex;
           font-size:0.32rem;
           line-height :0.5rem;
		   margin-top:0.07rem;
           margin-bottom:0.053rem;
		   width:17%;
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
        padding:0.2rem 0.35rem;;
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
.top_list_table{ background:url(../../../static/mock/img/topbangbg.png) right center no-repeat; width:100%; background-size:cover; height:100%; position :absolute; padding-bottom:0.4rem; overflow-y: scroll;}
.top_list_table_list{ color:#fff; font-size:0.37rem; display:-webkit-box; display:-ms-flexbox; display:flex; -webkit-box-pack:justify; -ms-flex-pack:justify; justify-content:space-between; -ms-flex-wrap:wrap; flex-wrap:wrap; padding:0 0.4rem; margin-top:0.27rem;}
.top_list_table_list span{display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    margin-top: 0.2rem;}
.top_list_img{ color:#fff; width:10%; text-align:center; font-size: 0.34rem;}
.top_list_img img{ width:0.4rem; height:0.4rem; display:block; margin-left:25%;}
.top_list_ta_vote{ font-size:0.37rem; width:1.54rem; height:0.6rem; line-height:0.6rem; color:#fff; font-size:0.4rem; text-align:center; background:#FF9DAC; border-radius:2rem;}
.top_list_ta_vote1{ background:#4AABF9;}
.top_list_ta_vote2{ background:#5CD8C0;}
.paiming{ width:10%;}
.touxiang{ width:10%;}
.xingming{ width:26%;}
.bianhao{ width:17%;}
.piaoshu{ width:10%;}
.jiapiao{ width:17%;}
.tishi{ font-size: 0.34rem; color:#EC0A42; text-align:center; width:100%; margin-bottom:0.06rem; margin-top:0.44rem;}
</style>
