<!-- 天使严选 -->
<template>
  <div class="HomeAngelWrap">
      <div class="Playertitle">
          <span class="Playertitle_left">选手展示</span>
          <span @click="toPlayerBanK">查看更多>></span>

      </div>
      <div class="HomeAngel" >
          <div v-for="(item,index) in  divisionBar" :key="index">
              <div class="HomeAngelLoge">
                    {{item.names}}
            </div>
            <ul class="HomeAngel_list">
                <li @click="toPlayerDetail(item.id)" v-for="(item,index) in item.players" :key="index">
                    <img :src="item.avatar" alt=""> 
                    <span class="angelName">{{item.username}}</span>
                    <span class="angelPrice">{{item.votes}}</span>
                </li>
            </ul>
          </div>
            
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
    name:'HomeAngel',
  data () {
    return {
        divisionBar:'',
        oneData:'',
        twoData:'',
        token:'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJpc3MiOiJodHRwczpcL1wvbG92eW91LnRvcCIsImF1ZCI6Imh0dHBzOlwvXC9sb3Z5b3UudG9wIiwiaWF0IjoxNTY5NDgzNjM5LCJuYmYiOjE1Njk0ODM2MzksImV4cCI6MTYwMTAxOTYzOX0.Hj4VSQKC5V16Xqpa5Rgn8kO_2ARf7NQBatKfKGEpGEc',
    };
  },

//   components: {},

    computed:{
        ...mapState(['staticImgH'])
    },

  mounted(){
    //   赛区分类
       var barobj=qs.stringify({
            limit:2,
            // page:1
        })
        this.$http.post('/api/division/players',barobj).then((res)=>{
            this.divisionBar=res.data.data.data
        })
  },

  methods: {
      toPlayerBanK(){
          this.$router.push('/PlayerShow')
      },
    //   跳选手详情
      toPlayerDetail(id){
          this.playerIds(id)//保存选手id
        this.addressIdIsSels('false') //投票盒子不显示 
        this.PlayerDetailPages('/')  //选手详情返回页面
        this.playDetailVoteDivs('false') //选手详情的投票盒子的消失
        this.$router.push('/PlayerDetails')
    },
      ...mapMutations(['playerIds','addressIdIsSels','PlayerDetailPages','playDetailVoteDivs']),
  }
}

</script>
<style scoped lang='stylus'>
.HomeAngelWrap{
    width:100%;
}
.HomeAngel{
    width:100%;
}
.HomeAngelLoge{
    width:9.68rem;
    height:1.8rem;
    margin:0 auto;
    margin-top:0.21rem;
    margin-bottom:0.133rem;
    display :flex;
    align-items :center;
    justify-content :center
    background:url('/static/mock/img/huabeiTwo.png') no-repeat;
    background-size:100% 100%;
    font-size:0.423rem;
    color:#4BAAF9;
}
.HomeAngel_list{
    display :flex;
    justify-content:space-between;
    flex-wrap:wrap;
    padding:0 0.4rem;
    >li{
        width:4.4rem;
        height:5.573rem;
        display:flex;
        flex-direction :column;
        margin-bottom:0.4rem;
        >img{
            width:4.4rem;
            height:4rem;
            background :skyblue;
        }
       >.angelName{
           font-size:0.347rem;
           color:rgba(0, 0, 0, 1);
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
       >.angelPrice{
           color:rgba(0, 0, 0, 1);
           font-size:0.32rem;
           line-height :0.45rem;
           padding: 0 .27rem;

       }
        
    }
}
.HomeAngelLogeTwo{
    width:9.2rem;
    height:1.333rem;
    margin:0 auto;
    margin-bottom:0.4rem;
    display :flex;
    align-items :center;
    justify-content :center
    background:url('/static/mock/img/huabeiOne.png') no-repeat;
    background-size:100% 100%;
    font-size:0.423rem;
    color:#4BAAF9;
}
.HomeAngel_listTwo{
    display :flex;
    justify-content:space-between;
    flex-wrap:wrap;
    padding:0 0.4rem;
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
           color:rgba(0, 0, 0, 1);
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
           color:rgba(0, 0, 0, 1);
           font-size:0.32rem;
           line-height :0.45rem;
           padding: 0 .27rem;

       }
        
    }
}
// 
.Playertitle{
    height:0.67rem;
    display :flex;
    align-items :center;
    justify-content :space-between;
    padding:0 0.4rem;
    margin-top:0.53rem;
    font-size:0.32rem;
    color:rgba(0, 0, 0, 1);
    >.Playertitle_left{
        font-size:0.48rem;
        font-weight:549;
        color:rgba(0, 0, 0, 1);
    }
}
</style>