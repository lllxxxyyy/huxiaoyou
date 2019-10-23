<!-- 精彩视频 -->
<template>
  <div class="wonderfulVideo">
      <div class="wonderfulVideo_title"><span>精彩视频</span> </div>
      <ul class="voideo_list">
        <li v-for="(item,index) in videoImg" :key="index">
          <img class="bofangBtn" :src="staticImgH+'bofangBtn.png'" alt="">
          <img class="videoImg"  alt="" :src="item.img">
        </li>
      </ul>
  </div>
</template>

<script>
import qs from 'qs'
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      videoImg:'',
    };
  },

  components: {},

  computed:{
        ...mapState(['staticImgH'])
    },

  mounted(){
    this.$http.post('/api/first/first_index').then((res)=>{
          this.videoImg=res.data.data.data
        })
  },

  methods: {}
}

</script>
<style scoped lang="stylus">
.wonderfulVideo{
    font-size:0.427rem;
}
.wonderfulVideo_title{
  font-size:0.427rem;
  color:rgba(0, 0, 0, 1);
  display :flex;
  align-items :center;
  margin-bottom:0.32rem;
  margin-top:0.4rem;
  >span{
    margin-left:0.4rem;
    padding-bottom:0.2rem;
    border-bottom:0.053rem solid  rgba(255, 204, 212, 1);
    color:rgba(0, 0, 0, 1);
    font-weight:600;
  }
}
.voideo_list{
  >li{
    width:100%;
    height:5.33rem;
    position :relative;
    margin-bottom:0.32rem;
    >.videoImg{
       width:100%;
       height:100%;
    }
    >.bofangBtn{
      width:0.97rem;
      height:0.97rem;
      position :absolute;
      left:50%;
      top:50%;
      margin-left:-0.453rem;
      margin-top:-0.453rem;
    }
  }
}
</style>