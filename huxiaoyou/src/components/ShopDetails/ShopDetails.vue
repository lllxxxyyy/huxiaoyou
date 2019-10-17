<!--  -->
<template>
  <div class="ShopDetails">
      <shopDetailHeader/>
      <shopDetailBody/>
  </div>
</template>

<script>
import shopDetailHeader from '././page/shopDetailHeader'
import shopDetailBody from '././page/shopDetailBody'
export default {
  data () {
    return {
    };
  },

  components: {
      shopDetailHeader,
      shopDetailBody
  },

//   computed: {},

//   mounted: {},

//   methods: {}
}

</script>
<style scoped lang="stylus">
.ShopDetails{
    width:100%;
    height:100%;
    background :#f2f2f2;
}

</style>