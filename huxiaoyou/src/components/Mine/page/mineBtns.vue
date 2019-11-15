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
                img:'MineUnion.png',
                name:'我的公会',
            },
            {
                img:'MineZhuan.png',
                name:'赚钱秘籍',
            },
            {
                img:'MineOrder.png',
                name:'我的订单',
            },
            {
                img:'MineAddress.png',
                name:'收货地址',
            },
            {
                img:'Mineabout.png',
                name:'关于我们',
            },
        ],
        smallBtns:[
            {
                img:'MineYao.png',
                name:'邀请好友为我投票',
            },
             
            {
                img:'MineInfo.png',
                name:'个人资料',
            },
            {
                img:'MIneAddVideo.png',
                name:'添加视频介绍（选手风采）',
            },
            {
                img:'MineZhi.png',
                name:'直播平台及id号',
            },
            {
                img:'MineShort.png',
                name:'短视频平台及id号',
            },
            {
                img:'MineUnion.png',
                name:'我的公会',
            },
            {
                img:'MineZhuan.png',
                name:'赚钱秘籍',
            },
            {
                img:'MineOrder.png',
                name:'我的订单',
            },
            {
                img:'MineAddress.png',
                name:'收货地址',
            },
            {
                img:'MineKe.png',
                name:'专属客服',
            },
            {
                img:'Mineabout.png',
                name:'关于我们',
            },
        ],

        // 提示盒子
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
    };
  },

//   components: {},

  computed:{
        ...mapState(['staticImgH'])
    },

  mounted() {
  },
    props:["personData"],
  methods: {
      triggerBtn(index){
          if(index==0){
           this.playerIds(this.personData.player_id)
            this.$router.push('/PowerPack')
          }else if(index==1){
              this.cityNamePerXs('')   //城市
              this.SignaturePerXs('')  //个签
              this.nickNamePerXs('')   //昵称
              this.agePerXs('')        //年龄
              this.heightPerXs('')     //身高
              this.weightPerXs('')     //体重
              this.constellationPerXs('')  //星座
              this.playerIds(this.personData.player_id)
              this.MineInformationPages('/Mine')
              this.$router.push('/MineInformation')
          }else if(index==2){
              this.$router.push('/PresentVideo')
          }else if(index==3){
              this.$router.push({path:'/LivePlatform',query:{'platform':this.personData.live_platform,'platformId':this.personData.live_id}})
          }else if(index==4){
              this.$router.push({path:'/ShortVideo',query:{'platform':this.personData.is_video,'platformId':this.personData.is_video_id}})
          }else if(index==5){
              var obj=qs.stringify({
                  type:1
              })
              this.$http.post('/api/user/me_gong',obj).then((res)=>{
                  if(res.data.code==200){
                      if(res.data.data.result==1){
                          this.AddunionPages('/Mine')
                          this.$router.push('/AddUnion')
                      }else{
                          this.MineGuildPages('/Mine')
                            this.$router.push('/MineGuild')
                      }
                  }
              })
          }else if(index==6){
              var specialDetailInfo={projectId:54,type:3}
            this.specialDetailInfos(specialDetailInfo)
            this.SpecialDetailsPages('/Mine')
            this.$router.push('/SpecialDetails')
          }else if(index==7){
                this.myOrderListPages('/Mine')
                this.orderTypes('')
                this.orderNums(0)
              this.$router.push('/orderList')
          }else if(index==8){
               this.ReceiptAddressPages('/Mine')
              this.$router.push('/ReceiptAddress')
          }else if(index==9){
            this.$router.push({path: '/CustomerService', query: {player_id: this.personData.player_id}})
          }else if(index==10){
              this.$router.push('/AboutWe')
          }
          
      },
    //   普通用户跳转
    UsertriggerBtn(index){
        if(index==0){
             var obj=qs.stringify({
                  type:1
              })
              this.$http.post('/api/user/me_gong',obj).then((res)=>{
                  if(res.data.code==200){
                      if(res.data.data.result==1){
                          this.AddunionPages('/Mine')
                          this.$router.push('/AddUnion')
                      }else{
                          this.MineGuildPages('/Mine')
                            this.$router.push('/MineGuild')
                      }
                  }
              })
        }else if(index==1){
           var specialDetailInfo={projectId:54,type:3}
            this.specialDetailInfos(specialDetailInfo)
            this.SpecialDetailsPages('/Mine')
            this.$router.push('/SpecialDetails')
        }else if(index==2){
                this.myOrderListPages('/Mine')
                this.orderTypes('')
                this.orderNums(0)
                this.$router.push('/orderList')
        }else if(index==3){
            this.ReceiptAddressPages('/Mine')
            this.$router.push('/ReceiptAddress')
        }else if(index==4){
            this.$router.push('/AboutWe')
        }
    },
    ...mapMutations(['ReceiptAddressPages','cityNamePerXs','SignaturePerXs','nickNamePerXs','agePerXs','heightPerXs','weightPerXs','constellationPerXs','myOrderListPages','orderTypes','orderNums','playerIds','MineInformationPages','MineGuildPages','AddunionPages','specialDetailInfos','SpecialDetailsPages']),
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
