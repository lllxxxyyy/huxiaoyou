<!-- 选手详情图片轮播 -->
<template>
  <div class="swiper">
      <ul :style="{transform: 'translateX('+transX1+')',width:width+'rem'}">
          <li v-for="(item,index) in imgData" :key="index">
              <img :src="item.src" alt="">
          </li>
      </ul>
      <div class="jiantou">
          <span @click="leftJ"> &#60 </span><span  @click="lrightJ"> &#62 </span>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
        index:'',
        transX1:'',
        imgData:'',
        width:'',
        
    };
  },

    components: {},

    computed:{
            ...mapState(['staticImgH'])
    },

    mounted() {
        this.imgData= this.$route.query.imgData
        this.index=this.$route.query.index
          this.width= 10* this.imgData.length
        this.transX1=this.index * 10+'rem'
    },
    methods: {
        leftJ(){
            this.index--
            if(this.index<0){
                this.index=this.imgData.length-1
            }
            this.transX1=-this.index*10+'rem'
        },
        lrightJ(){
            this.index++
            if(this.index>this.imgData.length-1){
                this.index=0
            }
            this.transX1=-this.index*10+'rem'
        }
    }
}

</script>
<style scoped lang="stylus">
.swiper{
    width:100%;
    height :100%;
    overflow :hidden;
    background :rgba(0,0,0,0.9)
    >ul{
        height:100%;
        display :flex;

        >li{
            width:10rem;
            height:100%;
            display :flex;
            align-items :center;
            justify-content :center;
            >img{
                width:100%;
            }
        }
    }
}
.jiantou{
    width:100%;
    height:1rem;
    display :flex;
    align-items: center;
    justify-content :space-between;
    font-size:0.6rem;
    color:#fff;
    position :absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    z-index:999;
    span{
        width:0.8rem;
        height:0.8rem;
        text-align :center;
        line-height :0.8rem;
        background :rgba(0,0,0,0.5)
    }
}
</style>