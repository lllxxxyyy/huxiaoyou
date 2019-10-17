<!-- HOmesearch -->
<template>
  <div class="homesearch">
      <searchDes/>
  </div>
</template>

<script>
import searchDes from '././page/searchDes'
export default {
  name:'HomeSearch',
  data () {
    return {
    };
  },

  components: {
      searchDes
  },

  // computed: {},

  // mounted: {},

  // methods: {}
}

</script>
<style scoped lang="stylus">

.homesearch{
    width:100%;
    height:100%;
    background :#fff;
}
</style>