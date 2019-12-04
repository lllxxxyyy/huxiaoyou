<!--  -->
<template>
  <div class="inviteFriend">
        <div class="inviteFriend_top">
                <div class="inviteFriend_header">
                        <img @click="inviteReturn"  :src="staticImgH+'yaoZuojiantou.png'" alt="">
                        <span>邀请选手</span>
                        <div class="inviteFriend_headerRight" @click="GeneratePoster">生成海报<img :src="staticImgH+'youjiantou.png'" alt=""></div>
                </div>
                <ul class="inviteFriend_money">
                        <li>
                            <span class="inviteFriend_moneyTitle">可提取余额</span>
                            <div class="inviteFriend_moneyQ">￥<span>{{yaoData.yao_money}}</span></div>
                        </li>
                        <li>
                            <span class="inviteFriend_moneyTitle">待选手认证</span>
                            <div class="inviteFriend_moneyQ">￥<span>{{yaoData.no_parent}}</span></div>
                        </li>
                </ul>
                <div class="inviteFriend_play">
                    <span>邀请选手</span>
                    <div class="inviteFriend_player"><span>{{yaoData.counts}}</span>人</div>
                </div>
                <ul class="inviteFriend_Certification">
                    <li><span class="inviteFriend_CerTitle">未认证选手</span><span>{{yaoData.no_parent}}人</span></li>
                    <li><span class="inviteFriend_CerTitle">已认证选手</span><span>{{yaoData.yes_parent}}人</span></li>
                </ul>
                <div class="inviteFriend_btn">
                    <span @click="InvitePlayers" :class="inviteFriendBtnShow==1?'inviteFriend_btnRed':''">邀请选手列表</span><span :class="inviteFriendBtnShow==2?'inviteFriend_btnRed':''" @click="WithdRecord">提现明细</span>
                </div>
                <div @click="withdrawBtn" class="inviteFriend_withdraw">提现</div>
        </div>
        <div class="hideDiv">

        </div>
        <div class="inviteFriend_bottom" v-if="playListShow">
            <ul class="play_list"  v-if="list.length>=1"  >
                <li  v-for="(item,index) in list" :key="index">
                    <div class="playList_Left">
                        <div class="playList_top">
                            <img :src="item.head_pic" alt="">
                            <span>{{item.username}}</span>
                        </div>
                        <span v-if="item.is_parent==0" class="playList_bottom">未认证</span>
                        <span  v-if="item.is_parent==1" :class="['playList_bottom',item.is_parent==1?'playList_bottomred':'']">已认证</span>
                    </div>
                    <span class="playList_Right">{{item.created_at}}</span>
                </li>
            </ul>
        </div>   
        <div class="inviteFriend_bottom" v-if="moneyListShow">
            <ul class="money_list" v-if="deposit.length>=1">
                <li  v-for="(item,index) in deposit" :key="index">
                    <div class="moneyList_Left">
                        <span>邀请选手所得奖励</span>
                        <span class="moneyList_bottom">+{{item.money}}</span>
                    </div>
                    <div class="moneyList_Right">
                        <span>余额：¥{{item.yu_money}}</span>
                        <span class="moneyList_RightBottom">{{item.ct_time}}</span>
                    </div>
                </li>
            </ul>
        </div>   
        <div class="poster" @click="posterhideC" v-if="posterShow">
			    <div class="poster_cha" ><img  src="static/mock/img/cha.png" alt=""></div>
		      <img @click.stop  :src="posterImg" alt="">
		      <span @click.stop>长按图片后 点击保存图片</span>
	    </div>  
  </div>
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
  data () {
    return {
        yaoData:'',
        deposit:'',
        list:'',
        playListShow:true,
        moneyListShow:false,
        inviteFriendBtnShow:1,
        posterImg:'',
        posterShow:false,
    };
  },

    // components: {},

    computed: {
      ...mapState(['staticImgH'])
    },

  mounted(){
      this.$http.post("api/user/yao_parson").then((res)=>{
          this.yaoData=res.data.data.result
          this.list=res.data.data.result.list
      })
  },

  methods: {
      inviteReturn(){
          this.$router.push('/Mine')
      },
      posterhideC(){
          this.posterShow=false
      },
      InvitePlayers(){
          this.playListShow=true
          this.moneyListShow=false
          this.inviteFriendBtnShow=1
      },
      GeneratePoster(){
          this.$http.post("api/user/user_img").then((res)=>{
              if(res.data.code==200){
                  this.posterImg=res.data.data.result;
                    this.posterShow=true
              }else{
                  this.alertText(res.data.msg)
              }
            
        })
      },
      WithdRecord(){
            this.playListShow=false
            this.moneyListShow=true
            this.inviteFriendBtnShow=2
            var obj=qs.stringify({
                type:1
            })
            this.$http.post("api/channel/ti_list",obj).then((res)=>{
                if(res.data.code==200){
                    this.deposit=res.data.data.result
                }else{
                    this.alertText(res.data.msg)
                }
                    
            })
      },
      withdrawBtn(){
          this.billMoneys(this.yaoData.yao_money)
          this.$router.push('/withdrawPlayer')
      },
      //   弹框提示
            alertText(text){
                var self=this
                clearInterval(self.timer2);
                        this.promptContent=text
                        this.showPrompt=true
                        self.timer2=setTimeout(function(){
                            self.showPrompt=false
                            clearInterval(self.timer2);
                        },2000)
                    return false;
            },
      ...mapMutations(['ReceiptAddressPages','MineInformationPages','billMoneys','isRealnames','isPersons']),
  }
}

</script>
<style scoped lang="stylus">
.inviteFriend{
    width:100%;
    height:100%;
    background :#fff;
}
.inviteFriend_top{
    width:100%;
    height:8.67rem;
    background :url('/static/mock/img/YBG.png') no-repeat;
    background-size:cover;
    position :fixed;
    top:0;
    left:0;
}
.hideDiv{
    width:100%;
    height:8.67rem;
}
.inviteFriend_header{
    width:100%;
    height:1.37rem;
    display :flex;
    align-items :center;
    justify-content :center;
    font-size:0.48rem;
    color:#fff;
    padding:0.45rem 0.4rem;
    position :relative;
    // top:0;
    // left:0;
    >img{
        width:0.3rem;
        position :absolute;
        top:50%;
        left:0.4rem;
        margin-top:-0.22rem;
    }
    >.inviteFriend_headerRight{
        display :flex;
        align-items :center;
        font-size:0.427rem;
        position :absolute;
        top:50%;
        right:0.4rem;
        margin-top:-0.22rem;
        >img{
            width:0.25rem;
            margin-left:0.27rem;
        }
    }
}
.inviteFriend_money{
    display :flex;
    color:#fff;
    align-items :center;
    justify-content :space-between;
    margin-bottom:0.32rem;
    margin-top:0.2rem;
    >li{
        width:50%;
        display :flex;
        flex-direction :column;
        align-items :center;
        justify-content :center;
        justify-content :space-between;
        >.inviteFriend_moneyTitle{
            font-size:0.373rem;
            margin-bottom:0.32rem;
        }
        >.inviteFriend_moneyQ{
            font-size:0.373rem;
            >span{
                font-size:0.67rem;
            }
        }
    }
}
.inviteFriend_play{
    display :flex;
    align-items :center;
    flex-direction :column;
    justify-content :center;
    color:#fff;
    font-size:0.373rem;
    margin-bottom:0.4rem;
    margin-top:0.6rem;

    >.inviteFriend_player{
        margin-top:0.27rem;
        >span{
            font-size:0.67rem;
            
        }
    }
}
.inviteFriend_Certification{
    display :flex;
    justify-content :space-between;
    padding:0 0.4rem;
    >li{
        width:3.65rem;
        height:1.653rem;
        display :flex;
        flex-direction :column;
        align-items :center;
        justify-content :center;
        color:#fff;
        font-size:0.347rem;
        border-radius:0.27rem;
        background :rgba(255, 255, 255, 0.2);
        >.inviteFriend_CerTitle{
            font-size:0.427rem;
            margin-bottom:0.27rem;
        }

    }
}
.inviteFriend_btn{
    display :flex;
    align-items :center;
    justify-content :space-between;
    color:rgba(255, 255, 255, 0.8);
    font-size:0.373rem;
    padding:0.93rem;
    >.inviteFriend_btnRed{
        color:#fff;
    }
}
.inviteFriend_bottom{
    margin-top:1.68rem;
    padding:0 0.4rem;
    >.play_list{
        width:100%;
        height:7.44rem;
        overflow-y:scroll;
        >li{
            display :flex;
            justify-content :space-between;
            align-items :flex-end;
            border-top:0.03rem solid rgba(0, 0, 0, 0.14);
            padding:0.32rem;
            >.playList_Left{
                display :flex;
                flex-direction :column;
                .playList_top{
                    display :flex;
                    align-items :center;
                    margin-bottom:0.32rem;
                    >img{
                        width:0.827rem;
                        height:0.827rem;
                        background:pink;
                        border-radius:50%;
                        margin-right:0.16rem;
                    }
                    >span{
                        font-size:0.427rem;
                        color:rgba(0, 0, 0, 1);

                    }
                }
                .playList_bottom{
                    color:rgba(0, 0, 0, 0.6);
                    font-size:0.347rem;
                }
                .playList_bottomred{
                    color:rgba(255, 0, 0, 1);
                }
            }
            >.playList_Right{
                color:rgba(0, 0, 0, 1);
                font-size:0.347rem;
            }
        }
    }
}
.money_list{
    width:100%;
    height:7.44rem;
    overflow-y:scroll;
    >li{
        display:flex;
        align-items:center;
        justify-content :space-between;
        border-top:0.02rem solid rgba(0, 0, 0, 0.14);
        padding:0.32rem;
        >.moneyList_Left{
            display :flex;
            flex-direction :column;
            color:rgba(0, 0, 0, 1);
            font-size:0.427rem;
            >.moneyList_bottom{
                font-size:0.48rem;
                color:rgba(255, 0, 0, 1);
                margin-top:0.32rem;
            }
        }
        .moneyList_Right{
            display :flex;
            flex-direction :column;
            align-items :flex-end;
            color:rgba(0, 0, 0, 1);
            font-size:0.427rem;
            >.moneyList_RightBottom{
                margin-top:0.32rem;
                color:rgba(0, 0, 0, 1);
                font-size:0.347rem;
            }
        }
    }
}
.inviteFriend_withdraw{
    width:2.15rem;
    height:2.15rem;
    position :absolute;
    bottom:-1.07rem;
    left:50%;
    margin-left:-1.07rem;
    background :rgba(255, 157, 172, 1);
    font-size:0.53rem;
    color:rgba(255, 255, 255, 1);
    text-align :center;
    line-height :2.15rem;
    border-radius:50%;
    box-shadow :0 0 0.2rem rgba(255, 157, 172, 1);
}
.poster{
			width:100%;
			height:100%;
			background: rgba(0, 0, 0, 0.8);
			position: absolute;
			top:0;
			left:0;
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;

		}
		.poster>img{
			width:8.67rem;
			height:15.413rem;
			margin-bottom:0.53rem;
		}
		.poster>span{
			width:8.67rem;
			height:1.067rem;
			border-radius:0.67rem;
			background: rgba(255, 157, 172, 1);
			font-size:0.427rem;
			color:rgba(255, 255, 255, 1);
			text-align: center;
			line-height: 1.067rem;
		}
		.poster .poster_cha{
			width:0.53rem;
			height:0.53rem;
			position: absolute;top:0.08rem;right:0.4rem;
		}
		.poster .poster_cha >img{
			width:0.53rem;
			height:0.53rem;
		}
</style>