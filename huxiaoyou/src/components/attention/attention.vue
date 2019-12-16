<!--  -->
<template>
    <div>
        <div class="attention" v-if="showAtten"  @click="attentionHide">
            <img @click.stop :src="staticImgH+'attention.png'" alt="">
            <span>长按保存图片，关注歌游文旅公众号</span>
        </div>
        <div class="attention" v-if="showAibei"  @click="AibeiHide">
            <img @click.stop :src="staticImgH+'aibeiGuan.png'" alt="">
            <span>长按保存图片，扫码关注公众号下载APP</span>
        </div>
        <!-- 提示关注公众号 -->
        <div @click="downBtn" class="downBtn">
            关注公众号
        </div>
        <!-- 提示下载APP -->
        <div @click="downAibeiBtn" class="downAibeiBtn">
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
        showAibei:false
    };
  },

//   components: {},

  computed:{
        ...mapState(['staticImgH'])
    },

//   mounted: {},

  methods: {
    // 隐藏狐小游公众号
    attentionHide(){
        this.showAtten=false
    },
    //   关注狐小游公众号
    downBtn(){
        this.showAtten=true
    },
    //  下载艾贝网
    downAibeiBtn(){
        this.showAibei=true
    },
    AibeiHide(){
        this.showAibei=false
    }
  }
}

</script>
<style scoped lang="stylus">
.attention{
    width:100%;
    height:100%;
    background :rgba(0,0,0,0.9);
    display :flex;
    flex-direction :column;
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
    >span{
        color:#fff;
        font-size:0.53rem;
        margin-top:0.8rem;
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
    z-index:998;
    border-radius:0.09rem 0 0 0.09rem;
    font-size:0.37rem;
    color:#fff;
    line-height :0.7rem;
    text-align :center;
    letter-spacing :0.03rem;
}
.downAibeiBtn{
    width:2.2rem;
    height:0.7rem;
    background :#FF3924;
    position:fixed;
    top:3.2rem;
    right:0;
    z-index:998;
    border-radius:0.09rem 0 0 0.09rem;
    font-size:0.37rem;
    color:#fff;
    line-height :0.7rem;
    text-align :center;
    letter-spacing :0.03rem;
}
</style>