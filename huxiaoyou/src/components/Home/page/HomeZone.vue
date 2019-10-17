<!-- home_专区 -->
<template>
  <div class="homeZoneWrap">
      <ul class="zone_list">
          <li @click="toSignUp">
              <div><img :src="staticImgH+'ZAsaishibaoming.png'" alt=""></div>
              <span>报名通道</span>
          </li>
          <li @click="toPlayerRanking">
              <div><img  :src="staticImgH+'ZBxuanshouanpai.png'" alt=""></div>
              
              <span>选手排名</span>
          </li>
          
          <li @click="toPlayerStyle">
              <div><img :src="staticImgH+'ZCxuanshoufencai.png'" alt=""></div>
              <span>选手风采</span>
          </li>
          <li @click="toAiBei">
              <div><img :src="staticImgH+'Zcansaifuli.png'" alt=""></div>
              
              <span>参赛福利</span>
          </li>
      </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default {
    name:'HomeZone',
  data () {
    return {
    };
  },

//   components: {},

    computed:{
        ...mapState(['staticImgH'])
    },

//   mounted: {},

  methods: {
    //   报名通道
      toSignUp(){
          this.$router.push('/SignUp')
      },
    //   选手排行
      toPlayerRanking(){
           this.$router.push('/PlayerRanking')
      },
    //   选手风采
      toPlayerStyle(){
          this.$router.push('/PlayerStyle')
      },
    //   参赛福利
      toAiBei(){
          window.location.href="http://app.aibebi.cn/aibei/dist/"
      }
  }
}

</script>
<style scoped lang='stylus'>
.zone_list{
    display :flex;
    justify-content :space-between;
    flex-wrap:wrap;
    padding:0 0.53rem;
    >li{
        display :flex;
        flex-direction :column;
        justify-content :space-between;
        align-items :center;
        margin-top:0.32rem;
        >span{
            font-size:0.347rem;
            color:rgba(0, 0, 0, 1);
            margin-top:0.16rem;
        }
        >div{
            >img{
                width:1.25rem;
                height:1.25rem;

            }
        }
        
    }
}
</style>