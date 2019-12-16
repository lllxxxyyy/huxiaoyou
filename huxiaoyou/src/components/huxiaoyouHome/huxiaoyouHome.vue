<!--   -->
<template>
    <div class="huHome">
        <div class="huHome_header">
            狐小游首页
        </div>
        <ul class="huHome_list">
            <li>
                <img :src="staticImgH+'aibei.png'" alt="">
                <span>艾贝商城</span>
            </li>
            <li>
                <img :src="staticImgH+'public.png'" alt="">
                <span>公益内购</span>
            </li>
            <li>
                <img :src="staticImgH+'menma.png'" alt="">
                <span>猛犸市集</span>
            </li>
            <li>
                <img :src="staticImgH+'saishi.png'" alt="">
                <span>赛事专区</span>
            </li>
        </ul>
        <div class="homeBanner">
            <swiper class="banner_list"  :options="swiperOption">
                    <!-- slides -->
                    <swiper-slide class="banner_li">
                        <img  alt="">
                    </swiper-slide>
                    <!-- Optional controls -->
                     <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
        </div>
        <!-- <div v-for="(item,index) in turn" :key="index">
            <div>{{item.quest}}</div>
            <span v-for="(item2,index2) in item.da"   :class="{'color2':selectIndex[index]===index2}" @click="dian(index,index2)"  :key="index2"> 
                    {{item2.item}}
            </span>
        </div>   -->
        <div class="TournamentArea">
            <div class="TourArea_header">
                <span class="TourArea_header_left">赛事专区</span>
                <div class="TourArea_header_right" @click="toEventSpecific">
                    <span>发现更多赛事</span>
                    <img :src="staticImgH+'MineRight.png'" alt="">
                </div>
            </div>
            <ul class="TourArea_list">
                <li>
                    <img src="" alt="">
                </li>
                <li>
                    <img src="" alt="">
                </li>
            </ul>
        </div>
        <div class="sort_public">
            <div class="sortHeader_public">
                <span>艾贝商城</span>
            </div>
            <ul class="sortlist_public">
                <li>
                    <div class="sortlist_public_img" :style="{'background-image':'url(../../static/mock/img/add_succedd.png)'}"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
                <li>
                    <div class="sortlist_public_img"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
                <li>
                    <div class="sortlist_public_img"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
                <li>
                    <div class="sortlist_public_img"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
                <li>
                    <div class="sortlist_public_img"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
                <li>
                    <div class="sortlist_public_img"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
            </ul>
            <div class="sortdes_public">
                <span>去艾贝商城，积累更多财富</span>
                <img :src="staticImgH+'MineRight.png'" alt="">
            </div>
        </div>
        <div class="sort_public">
            <div class="sortHeader_public">
                <span>艾贝商城</span>
            </div>
            <ul class="sortlist_public">
                <li>
                    <div class="sortlist_public_img" :style="{'background-image':'url(../../static/mock/img/add_succedd.png)'}"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
                <li>
                    <div class="sortlist_public_img"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
                <li>
                    <div class="sortlist_public_img"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
                <li>
                    <div class="sortlist_public_img"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
                <li>
                    <div class="sortlist_public_img"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
                <li>
                    <div class="sortlist_public_img"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
            </ul>
            <div class="sortdes_public">
                <span>去艾贝商城，积累更多财富</span>
                <img :src="staticImgH+'MineRight.png'" alt="">
            </div>
        </div>
        <div class="sort_public">
            <div class="sortHeader_public">
                <span>艾贝商城</span>
            </div>
            <ul class="sortlist_public">
                <li>
                    <div class="sortlist_public_img" :style="{'background-image':'url(../../static/mock/img/add_succedd.png)'}"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
                <li>
                    <div class="sortlist_public_img"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
                <li>
                    <div class="sortlist_public_img"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
                <li>
                    <div class="sortlist_public_img"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
                <li>
                    <div class="sortlist_public_img"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
                <li>
                    <div class="sortlist_public_img"><img src="" alt=""></div>
                    <span class="sortlistName_public">法国大使拉杆箱</span>
                    <span>¥499.00</span>
                </li>
            </ul>
            <div class="sortdes_public">
                <span>去艾贝商城，积累更多财富</span>
                <img :src="staticImgH+'MineRight.png'" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
        // turn:[
        //     {
        //         quest:'ggggggggggggggggg?????',
        //         da:[{item:'天放弃'},{item:'李欣悦'},{item:'佩奇'},{item:'老王'}]
        //     },
        //     {
        //         quest:'ggggggggggggggggg?????',
        //         da:[{a:'天放弃'},{B:'李欣悦'},{C:'佩奇'},{D:'老王'}]
        //     },
        // ],
        // selectIndex:[],
         slidersData:[],  //banner数据
          swiperOption: {
              pagination: {
                el: '.swiper-pagination',
              },
              observer:true,
              observeParents:true,
              loop:true,
              autoplay: {
                delay: 2000,
            // 　　    disableOnInteraction: false,
            　　},
                speed:500,
                // preventLinksPropagation : false,
        },
    };
  },

  components: {
      
  },

  computed:{
        ...mapState(['staticImgH'])
    },

  mounted(){
      this.$http.post('/api/home/index').then((res)=>{
          console.log(res)
      })
  },

  methods: {
      toEventSpecific(){
          this.$router.push('/EventSpecific')
      }
        // dian(index,index2){
        //     if(this.selectIndex[index]!=index2){
        //         this.selectIndex[index]=index2
        //     }else {
        //         this.selectIndex[index]=-1
        //     }
        // }
  }
}

</script>
<style scoped lang="stylus">
// .color2{
//     color:red;
// }
.huHome_header{
    width:100%;
    height:1.23rem;
    text-align :center;
    line-height :1.23rem;
    font-size:0.48rem;
    border-bottom:0.03rem solid rgba(0, 0, 0, 0.1);
}
.huHome_list{
    display :flex;
    align-items :center;
    justify-content :space-between;
    padding:0 0.64rem;
    padding-top:0.32rem;
    padding-bottom:0.48rem;
    border-bottom:0.16rem solid rgba(246, 246, 246, 1);
    >li{
        display :flex;
        flex-direction :column;
        align-items:center;
        font-size:0.347rem;
        >img{
            width:1.28rem;
            height:1.28rem;
            margin-bottom:0.16rem;
        }
    }
}
.homeBanner{
    width:100%;
    border-bottom:0.16rem solid rgba(246, 246, 246, 1);
}
.swiper-slide{
  img{
      display :block;
      width:100%;
      height:2.67rem;
    }
}
.swiper-container >.swiper-pagination{
  text-align :center;
  padding-right:0.27rem;
}
.swiper-pagination-bullets >>> .swiper-pagination-bullet{
  rgba(0, 0, 0, 0.36);
  width:0.8rem!important;
  height:0.053rem;
   opacity:1;
   border-radius:0.27rem;
}
.swiper-pagination-bullets >>> .swiper-pagination-bullet-active{
    width:0.8rem!important;
  background :rgba(0, 0, 0, 0.8);
}
.TournamentArea{
    padding:0.4rem;
}
.TourArea_header{
    display :flex;
    align-items :center;
    justify-content :space-between;
    font-size:0.48rem;
    >.TourArea_header_left{
        border-bottom:0.053rem solid rgba(0, 0, 0, 0.8);
        padding-bottom:0.2rem;
     }
}
.TourArea_header_right{
    display :flex;
    align-items :center;
    font-size:0.32rem;
    >img{
        width:0.19rem;
        height:0.29rem;
        margin-left:0.2rem;
    }
}
.TourArea_list{
    width:100%;
    margin-top:0.4rem;
    display :flex;
    align-items :center;
    overflow-x:scroll;
    >li{
        width:4.8rem;
            height:2.93rem;
        display :flex;
        align-items :center;
        margin-right:0.27rem;
        
        >img{
            width:4.8rem;
            height:2.93rem; 
            background :pink;
        }
    }
}
.sort_public{
    padding:0 0.4rem;
    padding-bottom:0.4rem;
    .sortHeader_public{
        display :flex;
        font-size:0.48rem;
        margin-bottom:0.32rem;
        >span{
            border-bottom:0.053rem solid rgba(0, 0, 0, 0.8);
            padding-bottom:0.2rem;
        }
    }
}
.sortlist_public{
    display :flex;
    flex-wrap:wrap;
    border-left:0.03rem solid rgba(0, 0, 0, 0.1);
    border-top:0.03rem solid rgba(0, 0, 0, 0.1);
    >li{
        width:33.33%;
        display :flex;
        flex-direction :column;
        align-items :center;
        font-size:0.373rem;
        color:rgba(255, 0, 0, 0.8);
        border-bottom:0.03rem solid rgba(0, 0, 0, 0.1);
            border-right:0.03rem solid rgba(0, 0, 0, 0.1);
            padding:0.2rem 0;
        >.sortlist_public_img{
            width:100%;
            height:1.6rem;
            background-image: url(/your/image/path.jpg);
            background-position: center center;    // 居中
            background-size: cover;                // 填满div
            background-repeat: no-repeat;
        }
        >.sortlistName_public{
            font-size:0.32rem;
            color:rgba(0, 0, 0, 0.8);
            margin-bottom:0.16rem;
            margin-top:0.16rem;
            
        }
    }
}
.sortdes_public{
    height:1.33rem;
    display :flex;
    align-items :center;
    justify-content :space-between;
    font-size:0.32rem;
    color:rgba(0, 0, 0, 0.8);
    padding:0 0.4rem;
    border-left:0.03rem solid rgba(0, 0, 0, 0.1);
    border-right:0.03rem solid rgba(0, 0, 0, 0.1);
    border-bottom:0.03rem solid rgba(0, 0, 0, 0.1);
    >img{
        width:0.19rem;
        height:0.29rem;

    }
}
</style>