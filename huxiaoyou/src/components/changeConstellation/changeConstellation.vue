<!-- 修改昵称 -->
<template>
  <div class="changeName">
        <div class="change_title">
        <img @click="changeRetuurn" :src="staticImgH+'zuojiantou.png'" alt="">
        <span>修改星座</span> 

        <span class="submit" @click="submit">保存</span>
      </div>
      <div class="change_des">
          <span class="change_destitle">我的星座</span>
           <select v-model="constellation">
            <option value ="">请选择</option>
            <option :value ="item.c_name" v-for="(item,index) in constellationData" :key="index">{{item.c_name}}</option>
        </select>
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
        constellation:'',//星座
        constellationData:'',
    };
  },

//   components: {},

    computed:{
        ...mapState(['staticImgH','constellationPerX'])
    },

  mounted(){
      this.constellation=this.constellationPerX
      this.$http.post('/api/division/conste_List').then((res)=>{
          if(res.data.code==200){
              this.constellationData=res.data.data
          }
      })
  },

  methods: {
    //   返回
      changeRetuurn(){
          this.$router.push('/MineInformation')
      },
    //   保存
    submit(){
            this.constellationPerXs(this.constellation)
            this.$router.push('/MineInformation')
    },
    ...mapMutations(['constellationPerXs']),
  }
}

</script>
<style scoped lang="stylus">
.changeName{
    width:100%;
    height:100%;
    background :#fff;
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
        margin-bottom:0.32rem;
    }
    >select{
        height:1rem;
        outline :none;
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