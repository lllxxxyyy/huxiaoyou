<!-- 我的 —— 各种小按钮 -->
<template>
  <div class="smallBtns">
        <ul v-if="personData.is_player==1">
            <li  @click="triggerBtn(index)"  v-for="(item,index) in smallBtns" :key="index" :class="item.className">
                <div class="smallBtns_left">
                        <img :src="staticImgH+item.img" alt="">
                        <span>{{item.name}}</span>
                </div>
                <div class="smallBtns_right">
                        <span v-if="index==0"></span>
                        <img :src="staticImgH+'MineRight.png'" alt="">
                </div>
            </li>
        </ul>
      <ul v-if="personData.is_player==0">
          <li @click="UsertriggerBtn(index)"  v-for="(item,index) in smallBtnsUser" :key="index" :class="item.className">
              <div class="smallBtns_left">
                    <img :src="staticImgH+item.img" alt="">
                    <span>{{item.name}}</span>
              </div>
              <div class="smallBtns_right">
                    <img :src="staticImgH+'MineRight.png'" alt="">
              </div>
          </li>
      </ul>
      <!-- 提示盒子 -->
            <transition name="fade">
                <div class="promptFather" v-if="showPrompt">
                    <div class="prompt" >
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
    name:"mineBtns",
  data () {
    return {
        smallBtnsUser:[
            {
                img:'lastTicket.png',
                name:'剩余免费票数',
            },
            {
                img:'MIneAddVideo.png',
                name:'收货地址',
            },
            {
                img:'MineContentWe.png',
                name:'联系我们',
            },
            {
                img:'MineAboutWe.png',
                name:'关于我们',
            },
        ],
        smallBtns:[
            {
                img:'mineBind.png',
                name:'绑定直播平台及id号',
            },
             
            {
                img:'MIneAddVideo.png',
                name:'添加视频介绍',
            },
            {
                img:'MIneAddVideo.png',
                name:'添加照片',
            },
            {
                img:'MIneAddVideo.png',
                name:'个人资料',
            },
            {
                img:'MIneAddVideo.png',
                name:'我的工会',
            },
            {
                img:'MIneAddVideo.png',
                name:'收货地址',
            },
            {
                img:'MineContentWe.png',
                name:'联系我们',
            },
            {
                img:'MineAboutWe.png',
                name:'关于我们',
            },
            {
                img:'mineBind.png',
                name:'绑定短视频平台及id号',
            },
            // {
            //     img:'MIneCansaiHistory.png',
            //     name:'参赛历史',
            // },

        ],
        personData:'',//用户信息（这里需要用到is_player）

        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
    };
  },

//   components: {},

  computed:{
        ...mapState(['staticImgH','personInfo','tokenH'])
    },

  mounted() {
       var obj=qs.stringify({
      })
    this.$http.post('api/user/info',obj,{
          headers: {
              'authorization': this.tokenH
          }
    }).then((res)=>{
      if(res.data.code==200){
          this.personData=res.data.data
      }else{
          var self=this
          clearInterval(self.timer2);
                  this.promptContent=res.data.msg
                  this.showPrompt=true
                  self.timer2=setTimeout(function(){
                      self.showPrompt=false
                      clearInterval(self.timer2);
                  },2000)
              return false;
      }
      
    })
  },

  methods: {
      triggerBtn(index){
          if(index==1){
              this.$router.push('/PresentVideo')
          }else if(index==2){
              this.$router.push('/PresentPhoto')
          }else if(index==0){
              
              this.$router.push('/LivePlatform')
          }else if(index==7){
              this.$router.push('/AboutWe')
          }else if(index==5){
               this.ReceiptAddressPages('/Mine')
              this.$router.push('/ReceiptAddress')
          }else if(index==3){
              this.cityNamePerXs('')
              this.SignaturePerXs('')
              this.nickNamePerXs('')
              this.$router.push('/MineInformation')
          }else if(index==8){
              this.$router.push('/ShortVideo')
          }else if(index==4){
              this.$router.push('/MineGuild')
          }
          
      },
    //   普通用户跳转
    UsertriggerBtn(){
        if(index==1){
            this.ReceiptAddressPages('/Mine')
              this.$router.push('/ReceiptAddress')
        }
        // else if(index==2){

        // }
        else if(index==3){
            this.$router.push('/AboutWe')
        }
    },
    ...mapMutations(['ReceiptAddressPages','cityNamePerXs','SignaturePerXs','nickNamePerXs']),
  }
}

</script>
<style scoped lang="stylus">
.smallBtns{
    width:100%;
    background :#fff;
    >ul{
        width:9.173rem;
        margin:0 auto;
        padding:0 0.32rem;
        border-radius:0.133rem;
        box-shadow :0 0.05rem 0.3rem rgba(241, 241, 241, 0.9);
        >li{
            width:100%;
            height:1.31rem;
            display :flex;
            align-items :center;
            justify-content :space-between;
            border-bottom:0.03rem solid rgba(241, 241, 241, 1);
            >.smallBtns_left{
                height:1.31rem;
                display :flex;
                align-items :center;
                font-size:0.347rem;
                color:rgba(51, 51, 51, 1);
                >img{
                    width:0.453rem;
                    height:0.453rem;
                    margin-right:0.27rem;
                }
            }
            >.smallBtns_right{
                height:1.31rem;
                display :flex;
                align-items :center;
                font-size:0.32rem;
                color:rgba(51, 51, 51, 0.6);
                >img{
                    width:0.187rem;
                    height:0.293rem;
                    margin-left:0.2rem;
                }
            }
        }
    }   
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
</style>