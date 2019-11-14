<!-- 选手暂时 -->
<template>
  <div class="PlayerRankingHome">
      <div class="PlayerRanking_header">
          <span>公会</span>
		  <div class="Labour" @click="toaddUnion">加入公会</div>
      </div>
	  <div class="LabourUnion_bar">
      <ul>
        <li @click="SpecialBarBtn(index,item.id)" :class="SpecialBarindex==index?'Special_barColor':''"
            v-for="(item,index) in SpecialTopicBodyBar" :key="index">
          {{item.username}}
        </li>
      </ul>
    </div>
    <ul class="LabourUnion_listTwo">
      <template v-for="(item,index) in RankingData" v-if="SpecialBarindex==0">
        <li @click="toSpecialDetails(item.content)" :key="index">
          <!-- {{item.RankingImgData[index]}} -->
          <img v-if="item.img" :src="item.img"  alt="">
          <span class="angelNameTwo">{{item.username}}</span>
          <span v-if="item.carrer!==0" class="angelNameTwoB">{{item.carrer}}</span>
          <!-- <span class="angelPriceTwo">ID号：{{item.id}}</span> -->
        </li>
      </template>
    </ul>
    <ul class="LabourUnion_listTwo">
      <template v-for="(item,index) in RankingData" v-if="SpecialBarindex==1">
        <li@click="toSpecialDetails(item.content)" :key="index">
          <!-- {{item.RankingImgData[index]}} -->
          <img v-if="item.img" :src="item.img"  alt="">
          <span class="angelNameTwo">{{item.username}}</span>
        </li>
      </template>
    </ul>
    <ul class="Special_list" v-if="SpecialBarindex==2">
          <li v-for="(item,index) in RankingData" :key="index" @click="toSpecialDetails(item.content)">
              <div class="SpecialList_left">
                  <span class="SpecialList_name">{{item.username}}</span>
              </div>
              <div class="SpecialList_right">
                  <img :src="item.img" alt="">
              </div>
          </li>
      </ul>
      <ul class="Special_list" v-if="SpecialBarindex==3">
          <li v-for="(item,index) in RankingData" :key="index" @click="toSpecialDetails(item.content)">
              <div class="SpecialList_left">
                  <span class="SpecialList_name">{{item.username}}</span>
                  <span class="SpecialList_num">时间:{{item.ct_time}}</span>
              </div>
              <div class="SpecialList_right">
                  <img :src="item.img" alt="">
              </div>
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
            SpecialTopicBodyBar: [],
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
        this.$http.post('/api/datum/datum_list').then((res)=>{
            if(res.data.code==200){
                this.SpecialTopicBodyBar=res.data.data.result
                 this.barId=this.SpecialTopicBodyBar[0].id
                this.getlistData()
            }
        })
  },
  methods: {
    //   跳文章详情
      toSpecialDetails(Con){
          this.unionDetailPages('/LabourUnion')
          this.$router.push({path:'/unionDetail',query:{content:Con}})
      },
    //   跳加入公会
    toaddUnion(){
         var obj=qs.stringify({
                  type:1
              })
              this.$http.post('/api/user/me_gong',obj).then((res)=>{
                  if(res.data.code==200){
                      if(res.data.data.result==1){
                          this.AddunionPages('/LabourUnion')
                          this.$router.push('/AddUnion')
                      }else{
                          this.MineGuildPages('/LabourUnion')
                            this.$router.push('/MineGuild')
                      }
                  }
              })
    },
    //   跳选手详情
    toPlayerDetail(id){
        this.playerIds(id)//保存选手id
        this.addressIdIsSels('false') //投票盒子不显示 
        this.PlayerDetailPages('/LabourUnion')  //选手详情返回页面
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
               is_parent:this.barId
            })
            this.$http.post('api/datum/datum_list',obj).then((res)=>{
                if(res.data.code==200){
                     this.RankingData=res.data.data.result
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
      ...mapMutations(['playerIds','PlayerDetailPages','addressIdIsSels','playDetailVoteDivs','AddunionPages','MineGuildPages','specialDetailInfos','SpecialDetailsPages','unionDetailPages']),
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
		width:100%;
		float:left;
		text-align:center;
		height:1.23rem;
		line-height:1.23rem;
    }
	>.Labour{ position:absolute; right:0; font-size:0.48rem; height:1.23rem; padding-right:0.4rem; line-height:1.23rem;}
}
.LabourUnion_bar{
    width:100%;
    height:1.147rem;
    // border-bottom:0.03rem solid #eeeeee;
    padding:0 0.27rem;
	margin-top:0.27rem;
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

.LabourUnion_listTwo{
    display :flex;
    justify-content:space-between;
    flex-wrap:wrap;
    padding:0 0.4rem;
    margin-top:0.27rem;
    >li{
        width:4.4rem;
        display:flex;
        flex-direction :column;
		position: relative;
		box-shadow:0px 3px 12px 0px rgba(255,204,212,0.5);
		border-radius:0.2rem;
		margin-bottom:0.6rem;
		padding-bottom:0.26rem;
        >img{
            width:4.4rem;
            height:4.4rem;
            background :skyblue;
			border-radius:0.16rem 0.16rem 0 0;
        }
       >.angelNameTwo{
           font-size:0.32rem;
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
       >.angelNameTwoB{
            font-size:0.32rem;
           color:rgba(0, 0, 0, 0.8);
           font-weight:550;
           margin-top:0.05rem;
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
           font-size:0.34rem;
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


// 列表
.Special_list{
    padding-top:0.27rem;
    
    >li{
        height:3.396rem;
        display :flex;
        justify-content :space-between;
        // align-items :center;
        padding:0.4rem 0.267rem;
		box-shadow:0px 3px 12px 0px rgba(254,216,222,0.5);
		border-radius:12px;
        background :#fff;
		margin:0 0.27rem;
        margin-bottom:0.2rem;
       >.SpecialList_left{
           display :flex;
           flex-direction :column;
           justify-content :space-between;
           font-size:0.32rem;
           >.SpecialList_name{
                color:#494949;
                font-size:16px;
                margin-top:0.27rem;
           }
           >.SpecialList_num{
               color:#797979;
           }
       } 
       >.SpecialList_right{
           display :flex;
           align-items :center;
           justify-content :center;
           >img{
               background :skyblue;
			   width:2.58rem;
               height:2.58rem;
			   border-radius:10px;
           }
       }
    }
}
</style>
