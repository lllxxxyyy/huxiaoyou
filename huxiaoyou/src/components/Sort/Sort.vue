<!-- 选手暂时 -->
<template>
  <div class="PlayerRankingHome">
      <div class="PlayerRanking_header">
          <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
          <span>选手排行</span>
      </div>
      <div class="SpecialTopicBody_bar">
          <ul>
              <li @click="SpecialBarBtn(index,item.id)" :class="SpecialBarindex==index?'Special_barColor':''" v-for="(item,index) in SpecialTopicBodyBar" :key="index">
                  {{item.names}}
              </li>
          </ul>
      </div>
      <ul class="HomeAngel_listTwo">
              <li @click="toPlayerDetail(item.id)"   v-for="(item,index) in RankingData" :key="index">
                  <!-- {{item.RankingImgData[index]}} -->
                 <img v-if="item.photo_introduction[0]" :src="item.photo_introduction[0].src" alt=""> 
                 <span class="angelNameTwo">{{item.username}}</span>
                 <span class="angelPriceTwo">{{item.votes}}+</span>
              </li>
        </ul>
        <!-- 提示盒子 -->
         <transition name="fade">
            <div class="promptFather" v-if="showPrompt">
                <div class="prompt" >
                    {{promptContent}}
                </div>
            </div>
        </transition>
        <Foot class="PublicFoot" />
      <div class="footer">
         
      </div>
  </div>
</template>

<script>
import Foot from './../Foot/Foot'
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
            token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJpc3MiOiJodHRwczpcL1wvbG92eW91LnRvcCIsImF1ZCI6Imh0dHBzOlwvXC9sb3Z5b3UudG9wIiwiaWF0IjoxNTY5NDA4NzE2LCJuYmYiOjE1Njk0MDg3MTYsImV4cCI6MTYwMDk0NDcxNn0.FPH-pgQp-2Vt1kbnZc_Z9JnJYvGYMeLOUHtkC4Tyj_w',
             // 提示盒子
            promptContent:'', //提示盒子的内容
            showPrompt:false,//提示盒子的吸收和显示
        };
    },
  components: {
      Foot
  },

    computed:{
            ...mapState(['staticImgH',])
        },

  mounted(){
      
      var barobj=qs.stringify({
      })
      this.$http.post('api/division/list',barobj,{
          headers: {
              'authorization': this.token
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
          this.$router.push('/')
      },
    //   获取数据
      getlistData(){
            var obj=qs.stringify({
                page:1
            })
            this.$http.post('api/player/division_ranking/'+this.barId,obj,{
                headers: {
                    'authorization': this.token
                }
            }).then((res)=>{
                if(res.data.code==200){
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
    padding:0 0.4rem;
    margin-top:0.27rem;
    >li{
        width:4.4rem;
        height:5.573rem;
        display:flex;
        flex-direction :column;
        >img{
            width:4.4rem;
            height:4rem;
            background :skyblue;
        }
       >.angelNameTwo{
           font-size:0.347rem;
           color:rgba(0, 0, 0, 0.8);
           font-weight:550;
           margin-top:0.27rem;
           margin-bottom:0.053rem;
           padding:0 0.27rem;
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
           padding: 0 .27rem;

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

.PublicFoot{
    position :fixed;
    bottom:0;
    left:0;
}
.footer{
   width:100%;
   height:1.458rem;
   background :#fff;
}
</style>