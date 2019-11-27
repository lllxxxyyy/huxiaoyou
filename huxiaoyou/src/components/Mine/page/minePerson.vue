<!--  -->
<template>
    <div class="Mineperson_wrap">
      <div class="minePerson_Player" v-if="personData.is_player==1">
          <div class="minePerson_img">
            <img :src="staticImgH+'mineBg.png'" alt="">
          </div>
          <div class="minePerson_des">
              <div class="minePerson_Info">
                  <div class="minePerson_Avatar"><img :src="personData.head_pic" alt="" ></div>
                  <div class="minePerson_InfoRight">
                      <div class="minePerson_InfoRiTop">
                        <span class="minePerson_InfoName">{{personData.username}}</span>
                        <div class="minePerson_InfoVip"><img :src="staticImgH+'Mine_vip.png'" alt=""><span>{{personData.level_name}}</span></div>
                      </div>
                      <div class="minePerson_quRen"><span class="minePerson_InfoRiBott" >{{personData.names}}</span><span class="" v-if="personData.is_realname==1">已认证</span></div>
                  </div>
              </div>
              <ul class="minePerson_EventInfo">
                <li>
                  参赛编号：{{personData.player_id}}
                </li>
                <li>赛区排名：{{personData.division_ranking}}</li>
                <li @click="toMineInfo"><img  :src="staticImgH+'playBian.png'" alt="">编辑</li>
              </ul>
              <ul class="minePerson_artick ">
                 <li>
                  <span class="minePerson_artickNum">{{personData.votes}}</span><span>总票数</span>
                </li>
                <li>
                  <span class="minePerson_artickNum">{{personData.help_amount}}</span><span>助力票</span>
                </li>
                <li>
                  <span class="minePerson_artickNum">{{personData.app_vote}}</span><span>剩余免费票</span>
                </li>
                <li @click="toAccountBalance">
                  <span class="minePerson_artickNum">{{personData.user_moneys}}</span><span>账单余额</span>
                </li>
              </ul>
              <div class="minePerson_InfoLike" v-if="personData.signature">{{personData.signature}}</div>
              <div class="minePerson_InfoDes">
                  <div>
                    <span v-if="personData.sex==1">男</span>
                    <span v-if="personData.sex==2">女</span>
                  </div>
                  <span v-if="personData.age">{{personData.age}}</span>
                  <span v-if="personData.city!=0">{{personData.city}}</span>
                  <span v-if="personData.constellation">{{personData.constellation}}</span>
                  <span v-if="personData.height">{{personData.height}}cm</span>
                  <span v-if="personData.weight">{{personData.weight}}kg</span>
                  <span v-if="personData.union_player==1">公会成员</span>
                  
                  
              </div>
          </div>
      </div>
      <!-- 提示盒子 -->
            <transition name="fade">
                <div class="promptFather" v-if="showPrompt">
                    <div class="prompt" >
                        {{promptContent}}
                    </div>
                </div>
            </transition>
      <!-- 普通用户 -->
      <div class="minePerson_Player" v-if="personData.is_player==0">
          <div class="minePerson_img">
              <img :src="staticImgH+'mineBg.png'" alt="">
          </div>
          <div class="minePerson_des">
              <div class="minePerson_Info">
                  <div class="minePerson_Avatar"><img :src="personData.head_pic" alt="" ></div>
                  <div class="minePerson_InfoRight">
                      <div class="minePerson_InfoRiTop">
                        <span class="minePerson_InfoName">{{personData.username}}</span>
                        <div class="minePerson_InfoVip"><img :src="staticImgH+'Mine_vip.png'" alt=""><span>{{personData.level_name}}</span></div>
                      </div>
                      <div class="minePerson_quRen"><span class="minePerson_InfoRiBott" >{{personData.names}}</span><span class="" v-if="personData.is_realname==1">已认证</span></div>
                      <span class="minePerson_InfoRiBotts" >{{personData.names}}</span>
                  </div>
              </div>
              <ul class="minePerson_artick ">
                <li  @click="toAccountBalance">
                  <span class="minePerson_artickNum">{{personData.user_moneys}}</span><span>账单余额</span>
                </li>
                <li>
                  <span class="minePerson_artickNum">{{personData.user_votes}}</span><span>免费票数</span>
                </li>
              </ul>
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
      
      // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
    };
  },
  props:["personData"],
  // components: {},

   computed:{
        ...mapState(['staticImgH'])
    },
  methods: {
    toAccountBalance() {
      this.isRealnames(this.personData.is_realname)//实名状态
      this.billMoneys(this.personData.user_moneys) //保存账单money
      this.isPersons(this.personData.is_player)
      this.$router.push('/AccountBalance')
    },
    ToReceiptAddress(){
      this.ReceiptAddressPages('/Mine')
      this.$router.push('/ReceiptAddress')
    },
    // 个人资料
    toMineInfo(){
      this.MineInformationPages('/Mine')
      this.$router.push('/MineInformation')
    },
    ...mapMutations(['ReceiptAddressPages','MineInformationPages','billMoneys','isRealnames','isPersons']),
  }
}
</script>
<style scoped lang='stylus'>
.Mineperson_wrap{
  margin-bottom:0.32rem;
}
.minePerson{
    width:100%;
}
.minePerson_img{
    width:100%;
    height:5.573rem;
    z-index:1;
    >img{
        width:100%;
        height:5.573rem;
    }
}
.minePerson_des{
    width:9.2rem;
    position :relative;
    margin:0 auto;
    margin-top:-3.33rem;
    z-index:2;
    background :rgba(255, 255, 255, 1);
    border-radius:0.133rem;
    box-shadow :0 0.05rem 0.3rem rgba(241, 241, 241, 0.9);
    >.minePerson_Info{
      display :flex;
      >.minePerson_Avatar{
        border:0.03rem solid #fff;
        width:1.87rem;
        height:1.87rem;
        margin-right:0.32rem;
        margin-left:0.4rem;
        margin-top:-0.53rem;
        border-radius:50%;
        border:0.09rem solid #fff;
        >img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius:50%;
        }
      }
      
      >.minePerson_InfoRight{
        flex:1;
          display :flex;
          flex-direction :column;
          >.minePerson_playBian{
              width:0.293rem;
              height:0.293rem;
              margin-top:0.16rem;
          }
          >.minePerson_InfoRiTop{
              display :flex;
              align-items :center;  
              justify-content :space-between;
              margin-top:0.133rem;
              >.minePerson_InfoName{
                    width:3.8rem;
                    font-size:0.53rem;
                    line-height :0.747rem;
                    margin-right:0.53rem;
                    color:rgba(0, 0, 0, 1);
                    line-height :0.747rem;
                    overflow :hidden;
                    text-overflow:ellipsis;
                    white-space:nowrap;
              }
              >.minePerson_InfoVip{
                display:flex;
                align-items :center;
                font-size:0.32rem;
                color:rgba(255, 162, 0, 1);
                margin-right:0.4rem;
                  >img{
                    width:0.4rem;
                    height:0.43rem;
                    margin-right:0.11rem;
                  }
              }
          }
          >.minePerson_quRen{
            font-size:0.32rem;
            color:rgba(255, 162, 0, 1);
            margin-top:0.16rem;
              >.minePerson_InfoRiBott{
                font-size:0.32rem;
                color:rgba(0, 0, 0, 0.36);
                
                margin-right:0.32rem;
              }
          }
          
          >.minePerson_InfoRiBotts{
            font-size:0.32rem;
            color:rgba(0, 0, 0, 0.36);
            margin-top:0.16rem;
            margin-bottom:0.6rem;
          }
      }
      
    }
    >.minePerson_EventInfo{
        display:flex;
        align-items :center;
        font-size:0.347rem;
        color:rgba(0, 0, 0, 1);
        padding:0 0.4rem;
        margin-top:0.173rem;
        margin-bottom:0.32rem;
        >li{
          margin-right:0.53rem;
           >img{
          width:0.293rem;
          height:0.293rem;
        }
        }
       
    }
    >.minePerson_artick{
      display :flex;
      margin:0 0.4rem;
      >li{
        display:flex;
        flex-direction :column;
        align-items :center;
        font-size:0.32rem;
        color:rgba(0, 0, 0, 0.36);
        margin-right:1.2rem;
        &:last-child{
          margin-right:0;
        }
        >span{
          line-height :.44rem;
          margin-bottom:0.4rem;
        }
        >.minePerson_artickNum{
          font-size:0.48rem;
          color:rgba(0, 0, 0, 1);
          margin-bottom:0.08rem;
          line-height:0.79rem;
        }
      }
    }
    >.minePerson_InfoLike{
      width:100%;
      padding-left:0.4rem;
      padding-right:0.8rem;
      margin-bottom:0.32rem;
      font-size:0.373rem;
      color:rgba(0, 0, 0, 1);
      line-height:0.53rem;
      
    }
    >.minePerson_InfoDes{
      font-size:0.32rem;
      color:rgba(0, 0, 0, 0.36);
      display :flex;
      margin:0 0.4rem;
      padding-bottom:0.453rem;
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
