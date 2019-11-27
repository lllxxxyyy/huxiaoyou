<!--  -->
<template>
    <div>
        <div class="attention" v-if="showAtten" @click="attentionHide">
            <img @click.stop :src="staticImgH+'attention.png'" alt="">
        </div>
        <!-- 提示下载APP -->
        <div @click="downBtn" class="downBtn">
            下载APP
        </div>
    </div>
  
  
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
        showAtten:false,
    };
  },

  components: {},

  computed:{
        ...mapState(['staticImgH'])
    },

  mounted: {},

  methods: {
      attentionHide(){
          this.showAtten=false
      },
      //   下载APP按钮
    downBtn(){
        this.showAtten=true
    },
  }
}

</script>
<style scoped lang="stylus">
.attention{
    width:100%;
    height:100%;
    background :rgba(0,0,0,0.9);
    display :flex;
    align-items :center;
    justify-content :center;
    position :fixed;
    top:0;
    left:0;
    z-index:999;
    >img{
        width:8rem;
        height:7.27rem;
    }
}
// 下载App
.downBtn{
    width:2.2rem;
    height:0.7rem;
    background :#FF3924;
    position:fixed;
    top:2.1rem;
    right:0;
    z-index:999;
    border-radius:0.09rem 0 0 0.09rem;
    font-size:0.37rem;
    color:#fff;
    line-height :0.7rem;
    text-align :center;
    letter-spacing :0.03rem;
}
</style>