<!-- 选手暂时 -->
<template>
  <div class="PlayerRankingHome">
      <div class="PlayerRanking_header">
          <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
          <span>天使工会</span>
      </div>
      <div class="SpecialTopicBody_bar">
          <ul>
              <li @click="artistsBar(item.name)" v-for="(item,index) in artists" :class="index==artistsIndex?'artistsColor':''" :key="index">{{item.name}}</li>
          </ul>
      </div>
      <ul class="HomeAngel_listTwo">
              <li @click="toPlayerDetail(item.id)" v-for="(item,index) in AngelUnionData" :key="index">
                 <img :src="item.photo_introduction[0].src" alt=""> 
                 <span class="angelNameTwo">{{item.username}}</span>
                 <span class="angelPriceTwo">{{item.votes}}</span>
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
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
    name:'AngelUnion',
  data () {
    return {
        SpecialTopicBodyBar:[
            {
                name:'天使旅行家'
            },
            {
                name:'天使旅行家'
            },
            {
                name:'天使旅行家'
            },
            {
                name:'天使旅行家'
            },
            {
                name:'天使旅行家'
            },
            {
                name:'天使旅行家'
            },
        ],
        artists:[
            {
                name:'男艺人'
            },
            {
                name:'女艺人'
            },
            {
                name:'大V主播'
            },
        ],
        artistsIndex:1,
        SpecialBarindex:0,
        AngelUnionData:"", //数据
        artistsBarName:'女艺人',
      
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
     this.getartistData()
  },

  methods: {
    //   跳选手详情
    toPlayerDetail(id){
        this.playerIds(id)//保存选手id
        this.addressIdIsSels('false') //投票盒子不显示 
        this.PlayerDetailPages('/AngelUnion')  //选手详情返回页面
        this.playDetailVoteDivs('false') ////选手详情的投票盒子的消失
        this.$router.push('/PlayerDetails')
    },
      SpecialBarBtn(index){
          this.SpecialBarindex=index
      },
      toReturn(){
          this.$router.push('/')
      },
      artistsBar(name){
          this.artistsBarName=name
          this.getartistData()
      },
      getartistData(){
           var obj=qs.stringify({
                page:1
            })
            this.$http.post('api/player/union_ranking/'+this.artistsBarName,obj,{
                headers: {
                    'authorization':this.tokenH
                }
            }).then((res)=>{
                if(res.data.code==200){
                    this.AngelUnionData=res.data.data.data
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
    padding:0 0.4rem;
    >ul{
        height:1.147rem;
         display :flex;
        align-items :center;
        justify-content :space-between;
        color:rgba(0, 0, 0, 0.6);
        font-size:0.373rem;
        >.artistsColor{
            color:rgba(0, 0, 0, 1);
            
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
</style>