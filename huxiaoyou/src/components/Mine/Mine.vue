<!-- 分类 -->
<template>
  <div class="mine">
      <minePerson/>
      <mineOrderlist/>
      <mineBtns/>
      <div class="Mine_SingingChina">歌游中国</div>
      <div class="footer">
         
      </div>
       <Foot class="PublicFoot" />
  </div>
</template>

<script>
import minePerson from '././page/minePerson'
import mineOrderlist from '././page/mineOrderlist'
import mineBtns from '././page/mineBtns'
import Foot from './../Foot/Foot'
import qs from 'qs'
export default {
  name:'Mine',
  data () {
    return {
    };
  },

  components: {
      Foot,
      minePerson,
      mineOrderlist,
      mineBtns
  },

  // computed: {},

  // mounted(){
     
  // },

  // methods: {}
}

</script>
<style scoped lang="stylus">
.mine{
  width:100%;
  height:100%;
  background :#fff;
}
.PublicFoot{
    position :fixed;
    bottom:0;
    left:0;
}
.Mine_SingingChina{
  width:100%;
  text-align :center;
  font-size:0.293rem;
  color:#a5a4a9;
  margin-top:0.347rem;
  letter-spacing :0.04rem;
}
.footer{
   width:100%;
   height:2rem;
   background :#fff;
}
</style>