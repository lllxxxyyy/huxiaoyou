<!--  -->
<template>
    <div class="Mineperson_wrap">
      <div class="minePerson_Player" v-if="personData.is_player==1">
          <div class="minePerson_img">
            <img :src="staticImgH+'mineBg.png'" alt="">
          </div>
          <div class="minePerson_des">
              <div class="minePerson_Info">
                  <img :src="personData.head_pic" alt="" class="minePerson_Avatar">
                  <div class="minePerson_InfoRight">
                      <div class="minePerson_InfoRiTop">
                        <span class="minePerson_InfoName">{{personData.username}}</span>
                        <span class="minePerson_InfoSai">{{personData.names}}</span>
                        <span class="minePerson_InfoBtn">编辑资料</span>
                      </div>
                      <span class="minePerson_InfoRiBott" >+{{personData.user_id}}</span>
                  </div>
              </div>
              <div class="LiveBroadcast">{{personData.live_platform}}  {{personData.live_id}}</div>
              <div class="minePerson_InfoLike">{{personData.signature}}</div>
              <div class="minePerson_InfoDes">
                  <div>
                    <img v-if="personData.sex==2" :src="staticImgH+'gril.png'" alt="">
                    <img v-if="personData.sex==1" :src="staticImgH+'boy.png'" alt="">
                    <span v-if="personData.sex==1">男</span>
                    <span v-if="personData.sex==2">女</span>
                  </div>
                  <div><span>{{personData.age}}</span></div>
                  <span v-if="personData.city">{{personData.city}}</span>
                  <span v-if="personData.constellation">{{personData.constellation}}</span>
                  <span v-if="personData.height">{{personData.height}}cm</span>
                  <span v-if="personData.weight">{{personData.weight}}kg</span>
              </div>
              <ul class="minePerson_artick " v-if="personData.is_player==1">
                <li>
                  <span class="minePerson_artickNum">{{personData.m_amount}}</span><span>友情票</span>
                </li>
                <li>
                  <span class="minePerson_artickNum">{{personData.help_amount}}</span><span>助力票</span>
                </li>
                <!-- <li>
                  <span class="minePerson_artickNum">33</span><span>分享卡包总金额</span>
                </li>
                <li>
                  <span class="minePerson_artickNum">44</span><span>账户余额</span>
                </li> -->
                
              </ul>
              
          </div>
          <!-- 提示盒子 -->
            <transition name="fade">
                <div class="promptFather" v-if="showPrompt">
                    <div class="prompt" >
                        {{promptContent}}
                    </div>
                </div>
            </transition>
      </div>
      <!-- 普通用户 -->
      <div class="minePerson_user" v-if="personData.is_player==0">
             <img :src="staticImgH+'mineBg.png'" alt="">
             <div class="minePerson_userDes">
                  <img :src="personData.head_pic" alt="">
                  <div class="minePerson_userCenter">
                     <span class="minePerson_userName" >{{personData.username}}</span>
                     <span class="minePerson_userId">{{personData.user_id}}</span>
                  </div>
                  <div class="minePerson_userBtn">点击参赛</div>
             </div>
             
      </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
  name:'minePerson',
  data () {
    return {
      personData:'',
      // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
    };
  },

  // components: {},

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
    ToReceiptAddress(){
      this.ReceiptAddressPages('/Mine')
      this.$router.push('/ReceiptAddress')
    },
    ...mapMutations(['ReceiptAddressPages']),
  }
}
</script>
<style scoped lang='stylus'>
.minePerson{
    width:100%;
}
.minePerson_img{
    width:100%;
    height:4.56rem;
    z-index:1;
    >img{
        width:100%;
        height:4.56rem;
        
    }
}
.minePerson_des{
    width:9.173rem;
    position :relative;
    margin:0 auto;
    margin-top:-2.83rem;
    padding-bottom:0.53rem;
    z-index:2;
    background :rgba(255, 255, 255, 1);
    border-radius:0.133rem;
    box-shadow :0 0.05rem 0.3rem rgba(241, 241, 241, 0.9);
    >.minePerson_Info{
      display :flex;
      >img{
        border:0.03rem solid #fff;
        width:2.133rem;
        height:2.133rem;
        margin-right:0.32rem;
        margin-left:0.4rem;
        margin-top:-0.32rem;
        background :yellow;
        border-radius:50%;
      }
      >.minePerson_InfoRight{
          >.minePerson_InfoRiTop{
            display :flex;
            flex-wrap:wrap;
              >.minePerson_InfoName{
                    font-size:0.48rem;
                    line-height :0.747rem;
                    margin-right:0.32rem;
                    margin-top:0.27rem;
                    color:rgba(0, 0, 0, 1);
              }
              >.minePerson_InfoSai{
                  font-size:0.32rem;
                  color:rgba(0, 0, 0, 0.36);
                  margin-top:0.587rem;
                  margin-right:1.07rem;
              }
              >.minePerson_InfoBtn{
                  width:2.213rem;
                  height:0.747rem;
                  background :#fff;
                  font-size:0.373rem;
                  color:rgba(255, 193, 203, 1);
                  line-height :0.747rem;
                  text-align :center;
                  border-radius:0.08rem;
                  margin-top:0.4rem;
                  border:0.03rem solid rgba(255, 193, 203, 1);
              }
          }
          >.minePerson_InfoRiBott{
            font-size:0.32rem;
            color:rgba(0, 0, 0, 1);
            margin-top:0.16rem;
            
          }
      }
      
    }
    >.LiveBroadcast{
      width:100%;
      padding:0 0.4rem;
      font-size:0.427rem;
      color:rgba(0, 0, 0, 0.8);
      margin-top:0.347rem;
      line-height :1.143rem;

    }
    >.minePerson_InfoLike{
      width:100%;
      padding-left:0.4rem;
      padding-right:0.8rem;
      margin-bottom:0.373rem;
      font-size:0.347rem;
      color:rgba(0, 0, 0, 0.8);
      line-height:0.507rem;
      
    }
    >.minePerson_InfoDes{
      font-size:0.32rem;
      color:rgba(0, 0, 0, 0.36);
      display :flex;
      margin:0 0.4rem;
      
      >div{
        line-height :0.453rem;
        margin-right:0.32rem;
        >img{
          width:0.27rem;
          height:0.27rem;
        }
      }
      >span{
        margin-right:0.32rem;
        line-height :0.453rem;
        &:last-child{
            margin-right:0rem;
        }
      }
    }
    >.minePerson_artick{
      display :flex;
      margin:0 0.4rem;
      margin-top:0.347rem;
      justify-content :space-between;
      >li{
        display:flex;
        flex-direction :column;
        align-items :center;
        font-size:0.32rem;
        color:rgba(0, 0, 0, 0.36);
        >.minePerson_artickNum{
          font-size:0.48rem;
          color:rgba(0, 0, 0, 1);
          margin-bottom:0.27rem;
        }
      }
    }
    >.minePerson_address{
      width:2.4rem;
      height:0.8rem;
      background :rgba(75, 170, 249, 1);
      display :flex;
      align-items :center;
      justify-content :center;
      font-size:0.32rem;
      color:rgba(255, 255, 255, 1);
      position :absolute;
      right:0;
      top:50%;
      margin-top:-0.4rem;
      border-radius:0.3rem 0 0 0.3rem;
    }
}
// 普通用户
.minePerson_user{
  width:100%;
  height:4.56rem;
  position :relative;
  >img{
      width:100%;
      height:4.56rem;
      position :absolute;
      top:0;
      left:0;
      z-index:1;
  }
  >.minePerson_userDes{
      display:flex;
      margin:0 0.4rem;
      padding-top:1.413rem;
      position :relative;
      z-index:2;
      position :relative;
      >img{
        width:2.133rem;
        height:2.133rem;
        margin-right:0.32rem;
        border-radius:50%;
      }
      >.minePerson_userCenter{
        display :flex;
        margin-left:0.27rem;
        flex-direction :column;
        margin-top:0.59rem;
        >.minePerson_userName{
          width:4rem;
          overflow :hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          font-size:0.53rem;
          color:rgba(0, 0, 0, 1);
          margin-bottom:0.27rem;
          
        }
        >.minePerson_userId{
          font-size:0.32rem;
          color:rgba(0, 0, 0, 1);
        }
      }
      >.minePerson_userBtn{
        width:2.213rem;
        height:0.747rem;
        border:0.03rem solid rgba(255, 255, 255, 1);
        border-radius:0.08rem;
        font-size:0.373rem;
        color:rgba(255, 255, 255, 1);
        line-height :0.741rem;
        text-align :center;
        position :absolute;
        right:0;
        top:2.133rem;
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