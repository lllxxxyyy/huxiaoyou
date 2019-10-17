<!--  -->
<template>
  <div class="address">
    <div class="hideDiv"></div>
      <div class="addressHead">
          <img @click="addressReturn" :src="staticImgH+'zuojiantou.png'" alt="">
          <span class="addressHeadCenter">收获地址</span>
          <span class="addressHeadAdd" @click="toaddAdress">添加</span>
      </div>
      <ul class="address_list" v-if="isKongPage">
          <li @click="toAssist(item.address_id)" v-for="(item,index) in addressData" :key="index">
              <div class="address_left">
                    <div class="address_top">
                      <span class="addresstop_name">{{item.consignee}}</span>
                      <span class="addresstop_phone">{{item.mobile}}</span>
                      <div class="address_label"><span v-if="item.is_default==1" class="address_defaul"> 默认</span><span class="address_where">{{item.label}}</span></div>
                    </div>
                  <div class="address_bottom">
                    <span>{{item.province_name}}</span><span>{{item.city_name}}</span><span>{{item.district_name}}</span><span class="detailedAddress">{{item.address}}</span>
                  </div>
              </div>
              <div class="address_right" @click.stop="AddressEdit(item)">编辑</div>
          </li>
      </ul>
      <div class="kongPage" v-else>
          <img :src="staticImgH+'addreess.png'" alt="">
          <span>没有记录，赶快去添加吧！</span>
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
</template>

<script>
import {mapState} from 'vuex'
import {mapMutations} from 'vuex'
import qs from 'qs'
export default {
    name:"ReceiptAddress",
  data () {
    return {
        addressData:'',//地址列表数据
        isKongPage:true,
        promptContent:'', //提示盒子的内容
        showPrompt:false,//提示盒子的吸收和显示
    };
  },
//   components: {},

    computed:{
		...mapState(['staticImgH','addressIdIsSel','ReceiptAddressPage','tokenH'])
	},

  mounted(){
       var obj=qs.stringify({
            player_id:this.playerId
        })
        this.$http.post("api/user/address_list",obj,{
            headers: {
                    'authorization': this.tokenH
                }
        }).then((res)=>{
            
            if(res.data.code==200){
                this.addressData=res.data.data
            }else{
                this.isKongPage=false
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
    //   跳编辑地址页面
    AddressEdit(addressdes){
        this.editAddressDess(addressdes)
        this.$router.push('/AddressEdit')
    },
      //返回
      addressReturn(){
          this.$router.push(this.ReceiptAddressPage)
      },
    //   跳添加收货地址
      toaddAdress(){
          this.ReceiptAddressAddPages('/ReceiptAddress')
          this.$router.push('/ReceiptAddressAdd')
      },
    //   返回助力页面
    toAssist(addressId){
        if(this.addressIdIsSel=="false"){
            this.addressIdIsSels('true')
            this.addressIds(addressId)
            this.$router.push('/PlayerDetails')
        }
    },
    ...mapMutations(['addressIds','addressIdIsSels','ReceiptAddressPages','ReceiptAddressAddPages','editAddressDess']),
  }
}
</script>
<style scoped lang="stylus">
.address{
    width:100%;
    height:100%;
    background :#fff;

}
.addressHead{
    height:1.23rem;
    background :#fff;
    width:100%;
    display:flex;
    align-items :center;
    justify-content :space-between;
    padding:0 0.27rem;
    border-bottom:0.03rem solid #F1F1F1;
    position :fixed;
    top:0;
    left:0;
    z-index:10;
    img{
         width:0.32rem;
        height:0.56rem;
    }
    .addressHeadCenter{
        font-size:0.48rem;
        color:rgba(0, 0, 0, 1);
    }
    .addressHeadAdd{
        font-size:0.43rem;
    }
}
.hideDiv{
    width:100%;
    height:1.23rem;
}
.address_list{
    background :#fff;
    >li{
        display:flex;
        justify-content :space-between;
        align-items :center;
        margin-left:0.27rem;
        border-bottom:0.03rem solid #F1F1F1;
        padding-top:0.53rem;
        padding-bottom:0.29rem;
        >.address_left{
            display:flex;
            flex-direction :column;
            justify-content :center;
            >.address_top{
                display:flex;
                align-items :center;
                >.addresstop_name{
                    font-size:0.43rem;
                    margin-right:0.88rem;
                    line-height :0.613rem;
                }
                >.addresstop_phone{
                    font-size:0.347rem;
                    margin-right:1.15rem;
                }
                >.address_label{
                    display:flex;
                    align-items :center;
                    >span{
                        width:0.88rem;
                        height:0.373rem;
                        line-height :0.4rem;
                        text-align :center;
                        border-radius:1.333rem;
                        font-size:0.24rem;
                        color:#fff;
                        margin-right:0.13rem;
                        &:last-child{
                            margin-right:0;
                        }
                    }
                    >.address_defaul{
                        background :rgba(255, 193, 203, 1);
                    }
                    >.address_where{
                        background :rgba(255, 193, 203, 0.4);
                        color:rgba(0, 0, 0, 1);
                    }
                }
            }
             >.address_bottom{
                //  width:6.75rem;
                 line-height :0.45rem;
                display:flex;
                font-size:0.32rem;
                >span{
                    margin-right:0.2rem;
                    &:last-child{
                        margin-right:0;
                    }
                }
                >.detailedAddress{
                    flex:1;

                }
        }
        }
       
        >.address_right{
            width:1.28rem;
            text-align :center;
            height:0.8rem;
            font-size:0.32rem;
            color:rgba(0, 0, 0, 0.4);
            border-left:0.03rem solid #F1F1F1;
            line-height :0.8rem;
        }
    }
}
// 空页面
.kongPage{
    display:flex;
    flex-direction :column;
    align-items :center;
    >img{
        width:5.52rem;
        height:3.76rem;
        margin-top:2.72rem;
        margin-bottom:0.53rem;

    }
    >span{
        font-size:0.4rem;
        color:#FF3924;
        line-height :0.56rem;

    }
}
// 提示盒子
.promptFather{
    width:100%;
    position :absolute;
    bottom:50%;
    left:0;
    z-index:10;
    display :flex;
    justify-content :center;
    align-items :center;
    
    >.prompt{
        padding:0.15rem 0.3rem;;
        background :#999;
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