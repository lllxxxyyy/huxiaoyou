<!-- 分类——search -->
<template>
  <div class="sortSearchWrap">
      <div class="sortSearch">
          <img src="" alt="">
          <span>搜索</span>
      </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  // components: {},

  // computed: {},

  // mounted: {},

  // methods: {}
}

</script>
<style scoped lang='stylus'>
.sortSearchWrap{
  padding:0.27rem;
  background :#f3f2f0;
}
.sortSearch{
  width:100%;
  height:0.844rem;
  display:flex;
  align-items :center;
  justify-content :center;
  background :#fff;
  border-radius:0.213rem;
  border:0.03rem solid #e4e3e8;
   >img{
     width:0.302rem;
     height:0.311rem;
   }
   span{
     font-size:0.329rem;
     color:#b8b7b5;
   }
}
</style>