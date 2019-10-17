<!-- 京东分类 -->
<template>
  <div class="homeSort">
      <div class="hideHomeSort"></div>
      <div class="sort_header" @click="tosearch">
            <img :src="staticImgH+'search.png'" alt="">
            <span>请输入您要搜索的选手名字或id</span>
      </div>
      <div class="sort_body">
            <div class="sort_proposeTitle">
                <span>全部分类</span>
                <div class="sort_shopTitle">
                        <swiper class="swiperList sortShopTitles"  :options="swiperOption" >
                            <swiper-slide class="shopTitleList"  v-for="(item,index) in shopTitle" :key="index" :class="{'shopTitleColor':num==index}">
                                <span @click="sortShopTitleD(item.id,index,item.names)" > {{item.names}}</span>
                            </swiper-slide>
                        </swiper>
                </div>
            </div>
            <div class="shop_sortWrap">
                <div class="shop_sort">
                    <span>{{palyerTitle}}</span>
                    <ul  class="sort_shopList">
                        <li @click="toPlayerDetail(item.id)" v-for="(item,index) in sortShopList" :key="index">
                            <img :src="item.head_pic" alt="">
                            <span>{{item.username}}</span>
                        </li>
                    </ul>
                </div>
          </div>
      </div>
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
    name:"HomeSort",
  data () {
    return {
        sortShopList:[],
        num:-1,
        shopTitle:'',
        parentId:'',
        swiperOption: {
            direction: 'vertical',
            slidesPerView: 'auto',
            freeMode: true,
            scrollbar: {
                el: '.sortShopTitles'
            },
        },
        palyerTitle:'总赛区',
        barID:0,//
        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
    };
  },
    computed:{
        ...mapState(['staticImgH','tokenH'])
    },
    mounted() {
        //赛区列表
        var obj=qs.stringify({

        })
        this.$http.post('api/division/list',obj,{
            headers: {
                    'authorization': this.tokenH
            }
        }).then((res)=>{
            this.shopTitle=res.data.data
        })
        this.getpalyerList()
    },
  methods: {
      //   跳选手详情
    toPlayerDetail(id){
        this.playerIds(id)//保存选手id
        this.addressIdIsSels('false') //投票盒子不显示 
        this.PlayerDetailPages('/Shop')  //选手详情返回页面
        this.playDetailVoteDivs('false') //选手详情的投票盒子的消失
        this.$router.push('/PlayerDetails')
    },
    //   去搜索
    tosearch(){
        this.HomeSearchPages('/Shop')
        this.$router.push('/HomeSearch')
    },
    //   点击赛区列表
      sortShopTitleD(id,index,name){
          this.palyerTitle=name
          this.num=index
          this.barID=id
          this.getpalyerList()
      },
    //   选手列表
      getpalyerList(){
        var playerListobj=qs.stringify({
             page:1
        })
        //
      this.$http.post('api/player/lists/'+this.barID,playerListobj,{
            headers: {
                    'authorization': this.tokenH,
                }
        }).then((res)=>{
            if(res.data.code==200){
                this.sortShopList=res.data.data.data
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
       ...mapMutations(['playerIds','PlayerDetailPages','addressIdIsSels','playDetailVoteDivs','HomeSearchPages']),
  }      
}

</script>
<style scoped lang="stylus">
.homeSort{
    width:100%;
    height:100%;
    background:#fff;
}
.hideHomeSort{
    width:100%;
    height:1.3rem;
}
.sort_header{
    width:9.2rem;
    height:0.8rem;
    display:flex;
    align-items :center;
    padding:0 0.27rem;
    position:fixed;
    top:0.27rem;
    left:50%;
    margin-left:-4.6rem;
    z-index:999;
    background :rgba(0, 0, 0, 0.06);
    border-radius:0.32rem;
    >img{
        width:0.43rem;
        height:0.35rem;
        margin-right:0.3rem;
    }
    >span{
        font-size:0.32rem;
        color:rgba(0, 0, 0, 0.36);
    }
}
.sort_body{
    display:flex;
    padding:0.27rem;
    padding-right:0;
    padding-top:0.0rem;
    background :#fff;
}
.sort_proposeTitle{
    width:1.55rem;
    height:0.53rem;
    letter-spacing:0.01rem;
    position:fixed;
    top:1.3rem;
    left:0.27rem;
    background:#fff;
    z-index:998;
    display:flex;
    >span{
        font-size:0.37rem;
        color:#333;
        font-weight:650;
        color:rgba(51, 51, 51, 0.8)
    }
}
.sort_shopTitle{
    width:1.55rem;
    height:12rem;
    display:flex;
    flex-direction:column;
    font-size:0.347rem;
    color:#333333;
    position:fixed;
    top:2.2rem;
    left:0.27rem;
    background:#fff;
    >.sortShopTitles{
         width:1.55rem;
          height:15rem;
          display:block!important;
         .shopTitleList{
            width:1.653rem;
            height:0.51rem;
            border-radius:1.33rem;
            margin-bottom:0.32rem;
            text-align:center;
            line-height :0.4rem;
            font-size:0.32rem;
            padding: 0.05rem 0.05rem;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            &:last-child{
                margin-bottom:0;
            }
        }
        .shopTitleColor{
            background:#FF5E4D;
            color:#fff;
        }
    }
   
}

.shop_sortWrap{
    width:100%;
    display:flex;
    flex-direction :column;
    align-items: flex-end;
}

.shop_sort{
    display:flex;
   flex-direction :column;
   >span{
        font-size:0.37rem;
        margin-bottom:0.32rem;
        font-weight:630;
        color:rgba(51, 51, 51, 0.8);
    }
}
.sort_shopList{
    width:7.47rem;
    display:flex;
    flex-wrap:wrap;
    >li{
        width:2.29rem;
        margin-right:0.2rem;
        display:flex;
        flex-direction:column;
        margin-bottom:0.32rem;
        >img{
            width:2.29rem;
            height:2.29rem;
            margin-bottom:0.27rem;
            border-radius:0.2rem;
            background :pink;
        }
        >span{
            width:2.29rem;
            height:0.45rem;
            font-size:0.32rem;
            padding: 0 0.2rem;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
            color:#333333;
            line-height :0.45rem;
            text-align :center;
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