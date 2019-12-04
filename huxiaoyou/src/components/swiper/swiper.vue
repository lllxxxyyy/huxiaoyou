<!-- 选手详情图片轮播 -->
<template>
  <div class="swiper" @click="returnSwiper">
      <v-touch class="swiperTouch" v-on:swipeleft="leftJ"  v-on:swiperight="lrightJ"  tag="div">
            <ul :style="{transform: 'translateX('+transX1+')',width:width+'rem'}">
                 <li v-for="(item,index) in imgData" :key="index">
                    <img :src="item.src" alt="">
                </li>
            </ul>
        </v-touch>
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
        this.transX1=-this.index * 10+'rem'
    },
    methods: {
        returnSwiper(){
            this.$router.push('/PlayerDetails')
        },
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
.PlayerRanking_header{
    width:100%
    height:1.23rem;
    display :flex;
    align-items :center;
    justify-content :center;
    position :relative;
    background :#fff;
    >img{
        width:0.32rem;
        height:0.56rem;
        position :absolute;
        top:50%;
        margin-top:-0.28rem;
        left:0.27rem;
    }
    >span{
        font-size:0.48rem;
        color:rgba(0, 0, 0, 1);
    }
}
.swiper{
    width:100%;
    height :100%;
    overflow :hidden;
    background :rgba(0,0,0,0.9);
    display:flex;
    flex-direction :column;
    >.swiperTouch{
        flex:1;
        width:100%;
        ul{
            height:100%;
            display:flex;
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