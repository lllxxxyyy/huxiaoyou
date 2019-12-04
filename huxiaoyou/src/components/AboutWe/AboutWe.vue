<!--客服中心 -->
<template>
  <div class="customerService">
        <!-- header -->
       <div class="customer_header">
                <img @click="toMine" class="orderDetailsHeaderLeft" :src="staticImgH+'zuojiantou.png'" alt="">
                <span>客服中心</span>
        </div>
        <!-- 服务列表 -->
        <div class="custtomer_body">
            <img :src="staticImgH+'cusKefu.jpg'" alt="">
            <p>工作时间，周一至周五9:00-18:00</p>
            <p>客服电话：010-5333423</p>
        </div>
        

  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
var qs = require('qs');
export default {
    name:"CustomerService",
  data () {
    return {
      
    };
  },
    // mounted(){
    // },
//   components: {},

//   computed: {},

computed:{
    ...mapState(['staticImgH','apis'])
},

  methods: {
      toMine(){
          this.$router.push('/Mine')
      }
  }
}

</script>
<style scoped lang="stylus">
.customerService{
    width:100%;
    height:100%;
    background :#fff;
}
.customer_header{
    height:1.23rem;
    display :flex;
    align-items :center;
    justify-content :center;
    font-size:0.53rem;
    position :relative;
    >img{
         width:0.32rem;
        height:0.56rem;
        position :absolute;
        left:0.27rem;
        top:50%;
        margin-top:-0.28rem;
    }
}
.custtomer_body{
    >img{
        width:4.43rem;
        height:4.293rem;
        margin:0.4rem auto;
        display :block;
    }
    p{
        font-size:0.373rem;
        color:rgba(0, 0, 0, 0.8);
        text-align :center;
        margin-bottom:0.32rem;
    }
}
</style>