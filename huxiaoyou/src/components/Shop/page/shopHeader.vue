<!-- shop_header -->
<template>
  <div class="shopHeader">
        <img :src="staticImgH+'zuojiantou.png'" alt="">
        <span>购物车</span>    
  </div>
  
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default {
  name:'shopHeader',
//   data () {
//     return {
//     };
//   },

//   components: {},

  computed:{
        ...mapState(['staticImgH'])
    },

//   mounted: {},

//   methods: {}
}

</script>
<style scoped lang="stylus">
.shopHeader{
  width:100%;
  height:1.2rem;
  display:flex;
  justify-content:center;
  align-items :center;
  position :fixed;
  border-bottom:0.03rem solid #F1F1F1;
  >img{
    width:0.53rem;
    height:0.45rem;
    position :absolute;
    top:50%;
    margin-top:-0.27rem;
    left:0.27rem;

  }
  >span{
    font-size:0.53rem;
    color:#000000;
  }
}
</style>