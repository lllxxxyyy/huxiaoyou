<!--  -->
<template>
  <div class="LivePlatform">
    <div class="PlayerRanking_header">
      <img @click="toReturn" :src="staticImgH+'zuojiantou.png'" alt="">
      <span>账单详情</span>
      <div class="PresentPhoto_admin" @click="toZhuan">赚钱秘籍</div>
    </div>
    <ul class="AccountBalance">
      <li v-for="(item, index) in accountBalance" :key="index">
        <div class="Account"><span>{{item.desc}}</span>
          <span class="Account_time">{{formatDate(item.change_time)}}</span></div>
        <div class="Balance">
          <span>余额：{{item.money}}</span>
          <span class="Balance_right">+{{item.user_money}}</span>
        </div>
      </li>
    </ul>
    <!-- 提示盒子 -->
    <transition name="fade">
      <div class="promptFather" v-if="showPrompt">
        <div class="prompt">
          {{promptContent}}
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
    name:"LivePlatform",
  data () {
    return {
        LiveName:'',
        liveId:'',
        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示

      accountBalance: {}
  
    };
  },

//   components: {},

  computed:{
        ...mapState(['staticImgH','tokenH','billMoney','isRealname'])
    },

  mounted(){
      this.getAccountBalance()
  },

  methods: {
      toReturn(){
          this.$router.push('/AccountBalance')
      },
      getAccountBalance(){
        // 没有找到账户明细接口
        this.$http.post('api/user/ba_money').then((res)=>{
          if(res.data.code===200){
            this.accountBalance = res.data.data.result
          }
        })
      },
    formatDate(value) {
      let date = new Date(value*1000)
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    },
    // formatDateTime(inputTime) {
    //     let date = new Date(inputTime*1000)
    //     console.log(date)
    //     let y = date.getFullYear();
    //     let m = date.getMonth() + 1;
    //     m = m < 10 ? ('0' + m) : m;
    //     let d = date.getDate();
    //     d = d < 10 ? ('0' + d) : d;
    //     let h = date.getHours();
    //     h = h < 10 ? ('0' + h) : h;
    //     let minute = date.getMinutes();
    //     let second = date.getSeconds();
    //     minute = minute < 10 ? ('0' + minute) : minute;
    //     second = second < 10 ? ('0' + second) : second;
    //     return `${y}-${m}-${d}`     //  ${h}:${minute}+':'+second;
    // }, 
    //跳赚钱秘籍
    toZhuan(){
          var specialDetailInfo={projectId:54,type:3}
            this.specialDetailInfos(specialDetailInfo)
            this.SpecialDetailsPages('/MoneyDetail')
            this.$router.push('/SpecialDetails')
    },
    ...mapMutations(['specialDetailInfos','SpecialDetailsPages']),

  }
}

</script>
<style scoped lang="stylus">
.LivePlatform{
    width:100%;
    height:100%;
    background :#fff;
}
    .PlayerRanking_header{
        width:100%
        height:1.23rem;
        display :flex;
        align-items :center;
        justify-content :space-between;
        position :relative;
        padding:0 0.4rem;
        >img{
            width:0.32rem;
            height:0.56rem;
        }
        >span{
            font-size:0.48rem;
            color:rgba(0, 0, 0, 1);
			padding-left:1.32rem;
        }
		>.PresentPhoto_admin{ font-size:0.42rem;}
    }
    .AccountBalance{
        width:9.2rem;
        margin:0 0.4rem;
        margin-top:0.27rem;
        border-radius:0.133rem;
        box-shadow :0 0rem 0.2rem rgba(253, 229, 231, 1);
        >li{
            border-bottom:0.02rem solid rgba(204, 204, 204, 0.4);
            margin:0 0.27rem;
            font-size:0.32rem;
            color:rgba(0, 0, 0, 1);
            display :block;
            align-items :center;
			padding:0.27rem 0;
            // justify-content :space-between; 
            &:last-child{
                border-bottom:0;
            }
			>.Account{ width:100%; display:-webkit-box; display:-ms-flexbox; display:flex; -webkit-box-align:center; -ms-flex-align:center; align-items:center; -webkit-box-pack:justify; -ms-flex-pack:justify; justify-content: space-between; height:0.7rem; line-height:0.7rem;
			>span{ font-size:0.4rem; color: #000;}
			>.Account_time{ font-size:0.34rem; color:#999;}
			}
			>.Balance{ width:100%; display:-webkit-box; display:-ms-flexbox; display:flex; -webkit-box-align:center; -ms-flex-align:center; align-items:center; -webkit-box-pack:justify; -ms-flex-pack:justify; justify-content: space-between; height:0.7rem; line-height:0.7rem;
			>span{ font-size:0.4rem; color: #000;}
			>.Balance_right{ color:#FF9DAC; font-size:0.46rem;}
			}
			
        }
    }
    .delBind{
         width:9.2rem;
        height:1.253rem;
        font-size:0.32rem;
            color:rgba(0, 0, 0, 1);
            margin:0 auto;
            margin-top:0.32rem;
            text-align :center;
            line-height :1.253rem;
            border-radius:0.133rem;
        box-shadow :0 0rem 0.2rem rgba(253, 229, 231, 0.8);
    }

    // 提示盒子
.promptFather{
    width:100%;
    position :fixed;
    left:0;
    right:0;
    top:0;
    bottom:0;
    margin:auto;
    display :flex;
    justify-content :center;
    align-items :center;
    z-index:999;
    >.prompt{
        padding:0.2rem 0.35rem;;
        background :rgba(0,0,0,0.7);
        color:#fff;
        border-radius:0.5rem;
        font-size:0.37rem;
    }
}
.fade-enter-active, .fade-leave-active {
//   transition: opacity .5s;
    transition: all .3s ease;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
   transform: translateY(0.32rem);
  opacity: 0;
}
.mine_money{
  width:9.2rem;
  height:3.693rem;
  border-radius:0.16rem;
  box-shadow :0 0.05rem 0.3rem rgba(254, 208, 215, 0.5);
  margin:0 auto;
  margin-top:0.32rem;
  display :flex;
  flex-direction :column;
  align-items :center;
  justify-content :center;
  font-size:0.427rem;
  color:rgba(0, 0, 0, 1);
}
.mine_moneydes{
  font-size :1.07rem;
  color:rgba(255, 157, 172, 1);
  margin-top:0.53rem;
}
.withdraw{
      width:9.2rem;
			height:0.8rem;
			text-align: center;
			line-height: 0.8rem;
			font-size:0.347rem;
			margin:0 auto;
			margin-top:2.13rem;
			background: rgba(255, 157, 172, 1);
			border-radius: 0.67rem;
			color:rgba(255, 255, 255, 1);
}
</style>
