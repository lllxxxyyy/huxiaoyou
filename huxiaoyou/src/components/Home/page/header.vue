<!-- home_header -->
<template>
  <div class="homeHeaderWrap">
      <div class="homeHeader" @click="toHomeSearch">
          <img :src="staticImgH+'search.png'" alt="">
          <span>请输入您要搜索的选手名字或id</span>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
export default {
  name:'HomeHeader',
  data () {
    return {
    };
  },

  // components: {},

  computed:{
        ...mapState(['staticImgH'])
    },

  // mounted: {},

  methods: {
    //搜索
    toHomeSearch(){
      this.HomeSearchPages('/')
      this.$router.push('/HomeSearch')
    },
    ...mapMutations(['HomeSearchPages']),
  }
}

</script>
<style scoped lang='stylus'>
.homeHeaderWrap{
  padding:0.27rem 0.4rem; 
}
.homeHeader{
  width:100%;
  height:0.8rem;
  display:flex;
  align-items :center;
  background :rgba(0, 0, 0, 0.06);
  border-radius:0.4rem;
   >img{
     width:0.43rem;
     height:0.35rem;
     margin-right:0.3rem;
     margin-left:0.27rem;
   }
   span{
     font-size:0.32rem;
     color:rgba(0, 0, 0, 0.36);
   }
}
</style>