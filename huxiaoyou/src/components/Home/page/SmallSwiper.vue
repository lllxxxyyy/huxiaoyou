<!-- home_轮播 -->
<template>
  <div class="smallBanner">
      <swiper class="smallbanner_list" v-if="slidersData.length>=1"  :options="swiperOption">
            <!-- slides -->
            <swiper-slide     class="banner_li" v-for="(item,index) in slidersData" :key="index">
                  {{item.name}}
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
                observer:true,
                observeParents:true,
                loop:true,
                
                autoplay: {
            　　    disableOnInteraction: false,
            　　},
                speed:300,
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
    this.$http.post('/api/ad/list',obj,{
            headers: {
                    'authorization':this.tokenH
                }
        }).then((res)=>{
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
}
.smallbanner_list{
    width:9.2rem;
    height:1.6rem;
    padding:0.16rem 0.0.29rem;
    >.swiper-wrapper{
        >.banner_li{
            width:100%;
            height:0.453rem!important;
            line-height :0.453rem;
            margin-bottom:0.16rem;
        }
    }  
}
</style>