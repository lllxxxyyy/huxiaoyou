<!-- home_轮播 -->
<template>
  <div class="smallBanner" v-if="slidersData.length!==0">
      <swiper class="smallbanner_list swiper-no-swiping" v-if="slidersData.length>=1"  :options="swiperOption">
            <!-- slides -->
            <swiper-slide     class="banner_li" v-for="(item,index) in slidersData" :key="index">
                  感谢「<img :src="item.head_pic" alt=""> {{item.nickname}}」为选手「 {{item.username}}」助力投票{{item.amount}}票
            </swiper-slide>
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
           swiperOption: {//swiper3
                direction: 'vertical',
                observeParents:true,
                loop:true,
                autoplay: {
                  delay: 1500,
                  disableOnInteraction: false,
                },
                speed:300,
            },
    };
  },

//   components: {},

  mounted(){
    this.$http.post('/api/first/vote_list').then((res)=>{
         this.slidersData=res.data.data
         console.log(this.slidersData)
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
        this.$router.push('/SpecialDetails')
      }
    },
    ...mapMutations(['specialInfos','specialDetailInfos']),
  }
}

</script>
<style scoped lang='stylus'>
.smallBanner{
    width:9.2rem;
    height:1.6rem;
    margin:0 auto;
//  margin-bottom:0.453rem;
    font-size:0.32rem;
    
    border-radius:0.16rem;
    box-shadow :0 0.05rem 0.3rem rgba(255, 204, 212, 0.3);
    padding:0.2rem 0.32rem;
}
.smallbanner_list{
    width:9.2rem;
    height:1.2rem;
	  text-height:1.2rem;
	  padding:0.14rem 0 0.32rem;
    >.swiper-wrapper{
        >.banner_li{
            width:100%;
            display :flex;
            >img{
              width:0.373rem;
              height:0.373rem;
              border-radius:50%;
            }
        }

    }  
}
</style>