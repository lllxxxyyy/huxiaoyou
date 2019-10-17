<!-- 购物车 -->
<template>
  <div class="shopFather">
        <!-- <shopHeader/> -->
        <!-- <div class="shopHide"></div> -->
        <!-- <shopList/> -->
        <tables/>
       <Foot class="PublicFoot" />

       <div class="footer">
         
      </div>
  </div>
</template>

<script>
import shopHeader from '././page/shopHeader'
import shopList from '././page/shopList'
import tables from '././page/table'
import Foot from './../Foot/Foot'
export default {
  name:"Shop",
  data () {
    return {
    };
  },

  components: {
      Foot,
      shopHeader,
      shopList,
      tables
  },

  // computed: {},

  // mounted: {},

  // methods: {}
}

</script>
<style scoped lang="stylus">
.shopFather{
  width:100%;
  height:100%;
}
.shopHide{
  width:100%;
  height:1.2rem;
}
.PublicFoot{
    position :fixed;
    bottom:0;
    left:0;
}
.footer{
   width:100%;
   height:1.458rem;
   background :#fff;
}
</style>