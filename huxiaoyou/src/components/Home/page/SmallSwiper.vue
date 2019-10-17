<!-- 小轮播翻页 -->
<template>
    <div class="smallBanner">
          <div class="smallList_wrap">
              <swiper class="smallbanner_list" v-if="slidersDataTwo.length>=1"  :options="swiperOption">
                    <!-- slides -->
                    <swiper-slide  class="banner_li" v-for="(item,index) in slidersDataTwo" :key="index">
                          {{item.nickname}}
                    </swiper-slide>
              </swiper>
          </div>
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
         slidersDataTwo:[],  //banner数据
           swiperOption: {//swiper3
                direction: 'vertical',
                observer:true,
                observeParents:true,
                loop:true,
                autoplay: {
            　　    disableOnInteraction: false,
            　　},
                speed:1000,
            },
    };
  },

//   components: {},

computed:{
        ...mapState(['tokenH'])
    },

  mounted(){
    var obj=qs.stringify({
          })
    this.$http.post('/api/first/vote_list',obj,{
            headers: {
                    'authorization':this.tokenH
                }
        }).then((res)=>{
         this.slidersDataTwo=res.data.data
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
    display :flex;
    align-items :center;
    justify-content :center;
}
.smallList_wrap{
  padding: 0.27 0.32rem;
}
.smallbanner_list{
    width:9.2rem;
    height:88px;
    >.swiper-wrapper{
        >.banner_li{
            width:100%;
            height:0.53rem!important;
            line-height :0.53rem;
        }
    }  
}
</style>