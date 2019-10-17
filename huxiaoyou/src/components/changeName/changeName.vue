<!-- 修改昵称 -->
<template>
  <div class="changeName">
        <div class="change_title">
        <img @click="changeRetuurn" :src="staticImgH+'zuojiantou.png'" alt="">
        <span>修改昵称</span>
        <span class="submit" @click="submit">保存</span>
      </div>
      <div class="change_des">
          <span class="change_destitle">我的名字（或昵称）</span>
          <input class="change_input" type="text" v-model="userName">
          <div class="change_num"><span>{{userName.length}}</span>/<span>20</span></div>
      </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
    name:"changeName",
  data () {
    return {
        userName:'花椒花椒',
    };
  },

//   components: {},

    computed:{
        ...mapState(['staticImgH','nickNamePerX'])
    },

  mounted(){
      this.userName=this.nickNamePerX
  },

  methods: {
    //   返回
      changeRetuurn(){
          this.$router.push('/MineInformation')
      },
    //   保存
    submit(){
        this.nickNamePerXs(this.userName)
        this.$router.push('/MineInformation')
    },
    ...mapMutations(['specialInfos','nickNamePerXs']),
  }
}

</script>
<style scoped lang="stylus">
.changeName{
    letter-spacing :0.04rem;
}
.change_title{
  width:100%;
   height:1.23rem;
  display :flex;
  align-items :center;
  justify-content :space-between;
  padding:0.4rem;
  >img{
    width:0.32rem;
    height:0.56rem;
  }
  >span{
      font-size:0.48rem;
      color:rgba(0, 0, 0, 1);
  }
  >.submit{
    font-size:0.427rem;
    color:rgba(0, 0, 0, 1);
  }
}
.change_des{
    margin:0.27rem 0.4rem;
    padding:0.27rem;
    display:flex;
    flex-direction :column;
    border-radius:0.133rem;
    box-shadow :0 0.05rem 0.3rem rgba(241, 241, 241, 0.9);
    >.change_destitle{
        font-size:0.32rem;
        color:rgba(0, 0, 0, 0.6);
    }
    >.change_input{
        border:0;
        outline :none;
        background :#fff;
        border-bottom:0.03rem solid rgba(241, 241, 241, 1);
        padding:0.27rem 0;
        font-size:0.373rem;
        line-height :0.53rem;
        letter-spacing :0.04rem;
    }
    >.change_num{
        padding:0.32rem 0;
        font-size:0.32rem;
        color:rgba(0, 0, 0, 1);

    }
}
</style>