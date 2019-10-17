<!-- 商品列表 -->
<template>
  <div class="shopList">
      <shopListHeader/>
      <div class="shopHide"></div>
      <shopListBody/>
  </div>
</template>

<script>
import shopListHeader from '././page/shopListHeader'
import shopListBody from '././page/shopListBody'
export default {
  data () {
    return {
    };
  },

  components: {
      shopListHeader,
      shopListBody
  },

  computed: {},

  mounted: {},

  methods: {}
}

</script>
<style scoped lang="stylus">
.shopList{
    width:100%;
    height :100%;
    background :#f6f1f7;
}
.shopHide{
  width:100%;
  height:1.2rem;
}
</style>