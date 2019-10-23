<!-- home_轮播 -->
<template>
  <div class="homeBanner">
      <swiper class="banner_list" v-if="slidersData.length>=1"  :options="swiperOption">
            <!-- slides -->
            <swiper-slide     class="banner_li" v-for="(item,index) in slidersData" :key="index">
                  <img @click="toJump(item.type,item.project_id,item.url)" :src="item.img" alt="">
            </swiper-slide>
            <!-- Optional controls -->
            <div class="swiper-pagination"  slot="pagination"></div>
      </swiper>
  </div>
</template>

<script>
import qs from 'qs'
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default {
  name:'banner',
  data () {
    return {
         slidersData:[],  //banner数据
          swiperOption: {
              pagination: {
                el: '.swiper-pagination',
              },
              observer:true,
              observeParents:true,
              loop:true,
              autoplay: {
            　　    disableOnInteraction: false,
            　　},
                speed:300,
                preventLinksPropagation : false,
        },
        swiperSlides: [1, 2, 3, 4, 5]
    };
  },

//   components: {},

  mounted(){
    this.$http.post('/api/ad/list').then((res)=>{
          this.slidersData=res.data.data
        })
  },
  methods: {
    toJump(type,projectId,url){
      if(type==1){
        window.location.href=url
      }else if(type==2){
        var specialInfo={projectId:projectId,type:type}
          this.specialInfos(specialInfo)
         this.$router.push('/SpecialTopic')
      }else if(type==3){
        var specialDetailInfo={projectId:projectId,type:type}
          this.specialDetailInfos(specialDetailInfo)
          this.SpecialDetailsPages('/')
        this.$router.push('/SpecialDetails')
      }
    },
    ...mapMutations(['specialInfos','specialDetailInfos','SpecialDetailsPages']),
  }
}

</script>
<style scoped lang='stylus'>
.homeBanner{
  width:100%;
  height:3.6rem;
  margin-bottom:0.453rem;
}
.banner_list{
  width:100%;
  height:3.6rem;
  >swiper-slide{
    width:100%;
    height:3.6rem;
    >img{
      width:100%;
      height:100%;
    }
  }
}
.swiper-slide{
  img{
      display :block;
      width:100%;
      height:3.6rem;
    }
}
.swiper-container >.swiper-pagination{
  text-align :center;
  padding-right:0.27rem;
}
.swiper-pagination-bullets >>> .swiper-pagination-bullet{
  background :rgba(255, 255, 255, 0.6);
  width:0.8rem;
  height:0.053rem;
   opacity:1;
   border-radius:0.27rem;
}
.swiper-pagination-bullets >>> .swiper-pagination-bullet-active{
  background :rgba(255, 255, 255, 1);
}
</style>