<!-- 选手暂时 -->
<template>
  <div class="PlayerRankingHome">
    <div class="PlayerRanking_header">
      <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
      <div class="search">
        <select v-model="search.type" placeholder="请选择">
          <option label="姓名" value="1">姓名</option>
          <option label="编号" value="2">编号</option>
        </select>
        <input v-model="search.value"/>
      </div>
      <span @click="searchPlayer(search.type, search.value)">搜索</span>
    </div>
    <ul class="HomeAngel_listTwo" v-if="searchResult && searchResult.length > 0">
      <li v-for="(item,index) in searchResult" :key="index" @click="toPlayerDetail(item.player_id, 'false')">
        <!-- {{item.RankingImgData[index]}} -->
         <div class="HomeAngel_listTwoImg"><img v-if="item.head_pic" :src="item.head_pic" alt=""></div>
        <div class="top_img">
          <img v-if="item.rank<=3" :src="staticImgH+'paiming'+item.rank+'.png'" alt="">
        </div>
        <div class="ta_vote" :class="{
		  		 ta_vote1: item.rank<=100 && item.rank>3,
		  		 ta_vote2: item.rank > 100,
		  		 }" @click.stop="toPlayerDetail(item.user_id, 'true')">给Ta投票
        </div>
        <span class="angelNameTwo">选手：{{item.username}}</span>
        <span class="angelPriceTwo">{{item.votes}}+</span>
      </li>
    </ul>
    <div class="search_k" v-if="!searchResult || (searchResult && searchResult.length < 1)">
      很抱歉,您搜索的选手不存在！
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
          search: {
            type: '1',
            value: ''
          },
          searchResult:[],

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
            ...mapState(['staticImgH','tokenH', 'searchConditions'])
        },

  mounted(){

    if (this.$route.query.searchValue) {
      this.search = this.$route.query.searchValue
    } else {
      this.search = this.searchConditions
    }
      this.searchPlayer(this.search.type, this.search.value);
      
    //   var barobj=qs.stringify({
    //   })
    //   this.$http.post('api/division/list',barobj,{
    //       headers: {
    //           'authorization': this.tokenH
    //       }
    // }).then((res)=>{
    //      this.SpecialTopicBodyBar=res.data.data
    //      this.barId=res.data.data[0].id
    //      this.getlistData()
    // })
    

  },

  methods: {
    //   跳选手详情
    toPlayerDetail(id, voteFlag){
        this.playerIds(id)//保存选手id
        this.addressIdIsSels('false') //投票盒子不显示 
        this.PlayerDetailPages('/SearchResult')  //选手详情返回页面
        this.playDetailVoteDivs(voteFlag) //选手详情的投票盒子的消失
        this.$router.push('/PlayerDetails')
    },
      SpecialBarBtn(index,id){
          this.barId=id
          this.SpecialBarindex=index
          this.getlistData()
      },
      toReturn(){
          this.$router.push('/PlayerRankingList');
      },
    //选手搜索
    searchPlayer(type, value){
      if (!value || (value && value.length < 1)) {
        this.alertText("请输入名字或编号")
        return false;
      }
      this.SearchConditions({
        type: type,
        value: value
      });
      let obj=qs.stringify({
        type: type,
        value: value
      })
      this.$http.post('api/player/search',obj).then((res)=>{
        if(res.data.code===200){
          this.searchResult=res.data.data.data
        }
      })
    },
    //   获取数据
      getlistData(){
            var obj=qs.stringify({
                page:1
            })
            this.$http.post('api/player/division_ranking/'+this.barId,obj).then((res)=>{
                if(res.data.code==200){
                     this.RankingData=res.data.data.data
                }else{
                    this.alertText(res.data.msg)
                }

            })
      },
    // 弹框提示
    alertText(text){
      var self=this
      clearInterval(self.timer2);
      this.promptContent=text
      this.showPrompt=true
      self.timer2=setTimeout(function(){
        self.showPrompt=false
        clearInterval(self.timer2);
      },2000)
      return false;
    },
      ...mapMutations(['playerIds','PlayerDetailPages','addressIdIsSels','playDetailVoteDivs', 'SearchConditions']),
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
        font-size:0.40rem;
        color:rgba(0, 0, 0, 1);
		text-align:center;
		width:1.4rem;
    }
}

.SpecialTopicBody_bar{
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

.HomeAngel_listTwo{
    display :flex;
    flex-wrap:wrap;
    padding:0 0.4rem;
    margin-top:0.47rem;
    >li{
        width:2.6rem;
		height:4.1rem;
        display:flex;
        flex-direction :column;
		position: relative;
		box-shadow:0px 3px 12px 0px rgba(255,204,212,0.5);
		border-radius:0.2rem;
		margin-bottom:0.6rem;
        margin-right:0.45rem;
        >.HomeAngel_listTwoImg{
            width:2.6rem;
            height:2.6rem;
            >img{
                width: 100%;
                height: 100%;
                object-fit: cover;
                border-radius:0.16rem;
            }
        }
        
       >.angelNameTwo{
           font-size:0.347rem;
           color:rgba(0, 0, 0, 0.8);
           font-weight:550;
           margin-top:0.27rem;
           margin-bottom:0.053rem;
           padding:0 0.2rem;
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
.SpecialTopicBody_content{padding:0 0.4rem;}
.SpecialTopicBody_center{padding:0.4rem 0.4rem; margin-bottom:0.2rem; box-shadow:0px 3px 12px 0px rgba(255,204,212,0.5); border-radius:12px 0px 12px 12px;}
.SpecialTopicBody_li{justify-content: space-between; display: flex; margin-bottom:0.4rem;}
.SpecialTopicBody_li span{ font-size: 0.4rem;}
.SpecialTopicBody_li .more{ color:#999; font-size: 0.37rem;}
.top_img{ position:absolute; color:#fff; margin-top:0.1rem; margin-left:0.1rem; width:0.4rem; height:0.4rem;}
.top_img img{ width:0.4rem; height:0.4rem; display:block;}
.ta_vote{ position:absolute; font-size:0.37rem; margin-left:0.46rem; right:0; bottom:1.50rem; width:2rem; height:0.8rem; line-height:0.9rem; color:#fff; font-size:0.4rem; text-align:center; background:url(../../../static/mock/img/toupiao.png) right center no-repeat; background-size:cover;}
.ta_vote1{ background:url(../../../static/mock/img/toupiao1.png) right center no-repeat; background-size:cover;}
.search{ background:#f5f5f5; height:0.9rem; padding:0 0.2rem; border-radius:1rem; margin-left:0.74rem; width:7.84rem; display:flex; justify-content:center; align-items:center;}
.search select{ border:0; background:none; padding-right:0.5rem; font-size:0.37rem; margin-right:0.2rem; height:0.9rem; background: url(/../../static/mock/img/nojian.png) no-repeat right center; background-size: 0.4rem 0.25rem;}
.search input{ border:0; background:none; width:5.8rem; font-size:0.37rem; height:0.9rem;}
select{
 		appearance:none;
        -moz-appearance:none;
        -webkit-appearance:none;
        border: none;
        font-size: 1rem;
        color: #666;
        text-align-last: center;
        background: url(/../../static/mock/img/nojian.png) no-repeat right center;
        background-size: 0.25rem 0.4rem;
    }
    select:focus {
        background: url(/../../static/mock/img/nojian.png) no-repeat right center;
        background-size: 0.4rem 0.25rem;
    }
.search_k{ font-size:0.46rem; text-align:center; margin-top:1rem; color:#666;}
</style>
