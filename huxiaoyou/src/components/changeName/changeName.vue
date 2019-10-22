<!-- 修改昵称 -->
<template>
  <div class="changeName">
        <div class="change_title">
        <img @click="changeRetuurn" :src="staticImgH+'zuojiantou.png'" alt="">
        <span v-if="changeIndexB==1">修改昵称</span> <span v-if="changeIndexB==2">修改年龄</span> 
        <span v-if="changeIndexB==3">修改身高</span> <span v-if="changeIndexB==4">修改体重</span> 
        <span v-if="changeIndexB==6">修改星座</span> 

        <span class="submit" @click="submit">保存</span>
      </div>
      <div class="change_des">
          <span class="change_destitle" v-if="changeIndexB==1">我的名字（或昵称）</span>
          <span class="change_destitle" v-if="changeIndexB==2">我的年龄</span>
          <span class="change_destitle" v-if="changeIndexB==3">我的身高</span>
          <span class="change_destitle" v-if="changeIndexB==4">我的体重</span>
          <span class="change_destitle" v-if="changeIndexB==6">我的星座</span>
          <input class="change_input" v-if="changeIndexB==1" type="text"  v-model="userName">
          <input class="change_input" v-if="changeIndexB==2" type="text" oninput = "value=value.replace(/[^\d]/g,'')"  v-model="age">
          <input class="change_input" v-if="changeIndexB==3" type="text" oninput = "value=value.replace(/[^\d]/g,'')" v-model="height">
          <input class="change_input" v-if="changeIndexB==4" type="text" oninput = "value=value.replace(/[^\d]/g,'')" v-model="weight">
          <input class="change_input" v-if="changeIndexB==6" type="text"  v-model="constellation">
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
        age:'',//年龄
        height:'',//身高
        weight:'',//体重
        constellation:'', //星座
        changeIndexB:'',  //上页面返回对应信息的下标
    };
  },

//   components: {},

    computed:{
        ...mapState(['staticImgH','nickNamePerX','agePerX','heightPerX','weightPerX','constellationPerX'])
    },

  mounted(){
      this.changeIndexB=this.$route.query.changeIndex
      if(this.changeIndexB==1){
          this.userName=this.nickNamePerX
      }else if(this.changeIndexB==2){
          this.age=this.agePerX
      }else if(this.changeIndexB==3){
          this.height=this.heightPerX
      }else if(this.changeIndexB==4){
          this.weight=this.weightPerX
      }else if(this.changeIndexB==5){
          this.changeIndexB=this.constellationPerX
      }
  },

  methods: {
    //   返回
      changeRetuurn(){
          this.$router.push('/MineInformation')
      },
    //   保存
    submit(){
         if(this.changeIndexB==1){
          this.nickNamePerXs(this.userName)
      }else if(this.changeIndexB==2){
          this.agePerXs(this.age)
      }else if(this.changeIndexB==3){
          this.heightPerXs(this.height)
      }else if(this.changeIndexB==4){
          this.weightPerXs(this.weight)
      }else if(this.changeIndexB==6){
          this.constellationPerXs(this.constellation)
      }
        
        this.$router.push('/MineInformation')
    },
    ...mapMutations(['specialInfos','nickNamePerXs','agePerXs','heightPerXs','weightPerXs','constellationPerXs']),
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